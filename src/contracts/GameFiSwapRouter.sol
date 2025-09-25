// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// OpenZeppelin Imports
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

// Chainlink Price Feed Interface
interface IAggregatorV3 {
    function latestRoundData()
        external 
        view
        returns (uint80, int256, uint256, uint256, uint80);
    function decimals() external view returns (uint8);
}

// Uniswap V2 Router Interface
interface IUniswapV2Router02 {
    function swapExactTokensForTokens(
        uint,
        uint,
        address[] calldata,
        address,
        uint
    ) external returns (uint[] memory);
}

/**
 * @title GameFiSwapRouter (All-in-One)
 * @author Your Name/Team
 * @notice A single contract for a Play-to-Save DEX that handles protocol registration,
 * credit claiming (via signatures), deposits, and swaps with USD-valued fee discounts.
 */
contract GameFiSwapRouter is Ownable, EIP712 {
    using SafeERC20 for IERC20;

    // --- Core State Variables ---
    IUniswapV2Router02 public immutable uniswapRouter;
    address public feeCollector;
    uint256 public swapFeeBps = 30; // 0.30% fee
    uint256 public registrationFee = 0.1 ether;
    uint256 public depositAmount = 0.5 ether; // Additional deposit for protocols

    // --- Credit & Protocol State Variables ---
    uint256 public constant CREDIT_VALUE_IN_CENTS = 10; // 1 credit = $0.10
    struct Protocol {
        string name;
        address owner; // The wallet that signs credit awards
        bool isRegistered;
        uint256 deposit; // Tracks deposited amount
    }
    mapping(address => Protocol) public protocols;
    mapping(address => mapping(address => uint256)) public userCredits; // protocol -> user -> balance
    mapping(address => mapping(address => uint256)) public userNonces; // protocol -> user -> nonce
    mapping(address => address) public tokenPriceFeeds; // token -> chainlink feed

    // --- EIP712 for signing ---
    bytes32 private constant CLAIM_TYPEHASH =
        keccak256(
            "Claim(address protocol,address user,uint256 amount,uint256 nonce)"
        );

    // --- Events ---
    event ProtocolRegistered(
        address indexed protocolId,
        address indexed owner,
        string name,
        uint256 deposit
    );
    event ProtocolRemoved(
        address indexed protocolId,
        address indexed owner,
        uint256 refundAmount
    );
    event CreditsClaimed(
        address indexed protocolId,
        address indexed user,
        uint256 amount
    );
    event SwapWithCredits(
        address indexed user,
        address indexed protocol,
        uint256 creditsUsed,
        uint256 feeValueInCents
    );
    event DepositUpdated(uint256 newDepositAmount);

    constructor(
        address _uniswapRouterAddress,
        address _feeCollector
    ) EIP712("GameFiSwapRouter", "1") {
        uniswapRouter = IUniswapV2Router02(_uniswapRouterAddress);
        feeCollector = _feeCollector;
    }

    // --- 🎮 Play-to-Save Core Functions ---
    /**
     * @notice Allows a user to claim credits by providing a signature from a protocol's owner.
     * @param _protocol The protocol awarding the credits.
     * @param _amount The amount of credits to award.
     * @param _signature A valid EIP-712 signature from the protocol owner.
     */
    function claimCredits(
        address _protocol,
        uint256 _amount,
        bytes calldata _signature
    ) external {
        require(protocols[_protocol].isRegistered, "Protocol not registered");
        require(_amount > 0, "Amount must be positive");
        uint256 nonce = userNonces[_protocol][msg.sender];
        bytes32 structHash = keccak256(
            abi.encode(CLAIM_TYPEHASH, _protocol, msg.sender, _amount, nonce)
        );
        bytes32 digest = _hashTypedDataV4(structHash);
        address signer = ECDSA.recover(digest, _signature);
        require(signer == protocols[_protocol].owner, "Invalid signature");
        userNonces[_protocol][msg.sender]++;
        userCredits[_protocol][msg.sender] += _amount;
        emit CreditsClaimed(_protocol, msg.sender, _amount);
    }

    /**
     * @notice Swaps tokens, applying protocol credits to offset the platform fee.
     * @param _protocol The protocol whose credits you want to use. Pass address(0) for no credits.
     * @param _amountIn The amount of input tokens to swap.
     * @param _amountOutMin The minimum amount of output tokens you will accept.
     * @param _path The swap path (e.g., [address(WETH), address(DAI)]).
     * @param _deadline The transaction deadline.
     */
    function swapExactTokensForTokensWithCredits(
        address _protocol,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address[] calldata _path,
        uint256 _deadline
    ) external {
        require(
            _protocol == address(0) || protocols[_protocol].isRegistered,
            "Protocol not registered"
        );
        address tokenIn = _path[0];
        address tokenOut = _path[_path.length - 1];

        // 1. Perform Swap
        IERC20(tokenIn).safeTransferFrom(msg.sender, address(this), _amountIn);
        IERC20(tokenIn).safeApprove(address(uniswapRouter), _amountIn);
        uint[] memory amounts = uniswapRouter.swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            _path,
            address(this),
            _deadline
        );
        uint256 amountOut = amounts[amounts.length - 1];

        // 2. Calculate Fee and Apply Credits
        uint256 totalFeeInTokens = (amountOut * swapFeeBps) / 10000;
        uint256 finalFeeInTokens = totalFeeInTokens;
        uint256 creditsToUse = 0;
        uint256 feeValueInCents = 0;

        if (
            _protocol != address(0) &&
            totalFeeInTokens > 0 &&
            userCredits[_protocol][msg.sender] > 0
        ) {
            // A. Get token price and convert fee to USD Cents
            (int256 price, uint8 priceDecimals) = getPrice(tokenOut);
            uint256 tokenOutDecimals = IERC20(tokenOut).decimals();
            feeValueInCents =
                (totalFeeInTokens * uint256(price) * 100) /
                (10 ** tokenOutDecimals * 10 ** priceDecimals);

            // B. Determine discount based on user's credit balance
            uint256 maxDiscountInCents = userCredits[_protocol][msg.sender] *
                CREDIT_VALUE_IN_CENTS;
            uint256 appliedDiscountInCents = maxDiscountInCents >
                feeValueInCents
                ? feeValueInCents
                : maxDiscountInCents;
            if (appliedDiscountInCents > 0) {
                // C. Calculate credits to spend and update user's balance
                creditsToUse = appliedDiscountInCents / CREDIT_VALUE_IN_CENTS;
                userCredits[_protocol][msg.sender] -= creditsToUse;
                // D. Calculate final fee in tokens
                uint256 feeDiscountInTokens = (appliedDiscountInCents *
                    (10 ** tokenOutDecimals * 10 ** priceDecimals)) /
                    (uint256(price) * 100);
                finalFeeInTokens = totalFeeInTokens - feeDiscountInTokens;
            }
        }

        // 3. Distribute Funds
        uint256 userAmount = amountOut - finalFeeInTokens;
        IERC20(tokenOut).safeTransfer(msg.sender, userAmount);
        if (finalFeeInTokens > 0) {
            IERC20(tokenOut).safeTransfer(feeCollector, finalFeeInTokens);
        }
        emit SwapWithCredits(
            msg.sender,
            _protocol,
            creditsToUse,
            feeValueInCents
        );
    }

    // --- ⚙️ Protocol & Admin Functions ---
    /**
     * @notice Onboards a new protocol to the platform with a registration fee and deposit.
     * @param _name The human-readable name of the protocol.
     */
    function registerProtocol(string calldata _name) external payable {
        require(
            msg.value >= registrationFee + depositAmount,
            "Insufficient fee or deposit"
        );
        require(
            !protocols[msg.sender].isRegistered,
            "Protocol already registered"
        );
        protocols[msg.sender] = Protocol({
            name: _name,
            owner: msg.sender,
            isRegistered: true,
            deposit: depositAmount
        });
        // Transfer excess ETH (if any) back to sender
        if (msg.value > registrationFee + depositAmount) {
            payable(msg.sender).transfer(
                msg.value - registrationFee - depositAmount
            );
        }
        emit ProtocolRegistered(msg.sender, msg.sender, _name, depositAmount);
    }

    /**
     * @notice Removes a protocol from the platform, optionally refunding the deposit.
     * @param _protocol The protocol to remove.
     * @param _refundDeposit Whether to refund the deposit to the protocol owner.
     */
    function removeProtocol(
        address _protocol,
        bool _refundDeposit
    ) external onlyOwner {
        require(protocols[_protocol].isRegistered, "Protocol not registered");
        Protocol memory protocol = protocols[_protocol];
        protocols[_protocol].isRegistered = false;
        uint256 refundAmount = 0;
        if (_refundDeposit && protocol.deposit > 0) {
            refundAmount = protocol.deposit;
            payable(protocol.owner).transfer(refundAmount);
        }
        protocols[_protocol].deposit = 0; // Clear deposit
        emit ProtocolRemoved(_protocol, protocol.owner, refundAmount);
    }

    /**
     * @notice Fetches the latest price for a token from its Chainlink feed.
     */
    function getPrice(address _token) public view returns (int256, uint8) {
        address priceFeedAddress = tokenPriceFeeds[_token];
        require(priceFeedAddress != address(0), "Price feed not available");
        IAggregatorV3 priceFeed = IAggregatorV3(priceFeedAddress);
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return (price, priceFeed.decimals());
    }

    /**
     * @notice Updates the deposit amount required for protocol registration.
     * @param _newDepositAmount The new deposit amount in wei.
     */
    function setDepositAmount(uint256 _newDepositAmount) external onlyOwner {
        depositAmount = _newDepositAmount;
        emit DepositUpdated(_newDepositAmount);
    }

    function setPriceFeed(
        address _token,
        address _priceFeed
    ) external onlyOwner {
        tokenPriceFeeds[_token] = _priceFeed;
    }

    function setFeeCollector(address _newCollector) external onlyOwner {
        feeCollector = _newCollector;
    }

    function setSwapFeeBps(uint256 _newFeeBps) external onlyOwner {
        require(_newFeeBps <= 100, "Fee too high"); // 1% max
        swapFeeBps = _newFeeBps;
    }

    function setRegistrationFee(uint256 _fee) external onlyOwner {
        registrationFee = _fee;
    }
}
