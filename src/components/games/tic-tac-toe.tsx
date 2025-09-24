'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Circle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import GameResultDialog from './game-result-dialog';

type Player = 'X' | 'O';
type Square = Player | null;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6], // diagonals
];

const checkWinner = (board: Square[]): Player | null => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const SquareComponent = ({ value, onClick }: { value: Square; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-24 h-24 flex items-center justify-center border-2 border-primary rounded-lg transition-colors",
        "hover:bg-primary/10 disabled:cursor-not-allowed"
      )}
      disabled={!!value}
    >
      {value === 'X' && <X className="w-16 h-16 text-red-500" />}
      {value === 'O' && <Circle className="w-14 h-14 text-blue-500" />}
    </button>
  );
};

export default function TicTacToe() {
  const [board, setBoard] = useState<Square[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | 'draw' | null>(null);

  const handlePlay = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const aiMove = () => {
    if (winner || isDraw) return;
    
    // Simple AI: find a random empty spot
    const emptySquares = board.map((sq, i) => sq === null ? i : null).filter(i => i !== null) as number[];
    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const move = emptySquares[randomIndex];
      handlePlay(move);
    }
  };
  
  useEffect(() => {
    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameResult(gameWinner === 'X' ? 'win' : 'lose');
    } else if (board.every(square => square !== null)) {
      setIsDraw(true);
      setGameResult('draw');
    } else if (currentPlayer === 'O') {
      const timeout = setTimeout(() => aiMove(), 500);
      return () => clearTimeout(timeout);
    }
  }, [board, currentPlayer]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
    setGameResult(null);
  };
  
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = `Next player: ${currentPlayer}`;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-headline">Tic Tac Toe</h2>
      <div className="flex items-center gap-4">
        <div className="text-lg font-semibold">{status}</div>
        <Button onClick={resetGame} variant="outline" size="icon">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, i) => (
          <SquareComponent key={i} value={board[i]} onClick={() => handlePlay(i)} />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">You are X. The AI is O.</p>
      <GameResultDialog result={gameResult} onPlayAgain={resetGame} />
    </div>
  );
}
