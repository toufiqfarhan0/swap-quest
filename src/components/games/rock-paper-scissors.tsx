'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Hand, HandMetal, Scissors } from 'lucide-react';
import GameResultDialog from './game-result-dialog';

type Choice = 'rock' | 'paper' | 'scissors';
const choices: Choice[] = ['rock', 'paper', 'scissors'];

const choiceIcons = {
  rock: <HandMetal />,
  paper: <Hand />,
  scissors: <Scissors />,
};

export default function RockPaperScissors() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [roundResult, setRoundResult] = useState<string | null>(null);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | 'draw' | null>(null);

  const roundsToWin = 2;

  const handlePlayerChoice = (choice: Choice) => {
    if (gameResult) return;

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);

    const result = determineWinner(choice, computerChoice);
    setRoundResult(result);

    let newPlayerScore = playerScore;
    let newComputerScore = computerScore;

    if (result === 'You win this round!') {
      newPlayerScore++;
      setPlayerScore(newPlayerScore);
    } else if (result === 'Computer wins this round!') {
      newComputerScore++;
      setComputerScore(newComputerScore);
    }
    
    if (newPlayerScore >= roundsToWin) {
      setGameResult('win');
    } else if (newComputerScore >= roundsToWin) {
      setGameResult('lose');
    }
  };

  const determineWinner = (player: Choice, computer: Choice) => {
    if (player === computer) return "It's a draw!";
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'scissors' && computer === 'paper') ||
      (player === 'paper' && computer === 'rock')
    ) {
      return 'You win this round!';
    }
    return 'Computer wins this round!';
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setRoundResult(null);
    setGameResult(null);
  };
  
  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-2xl font-headline">Rock, Paper, Scissors</h2>
      <p className="text-muted-foreground">First to {roundsToWin} wins gets 50 credits!</p>

      <div className="flex gap-4">
        {choices.map((choice) => (
          <Button
            key={choice}
            onClick={() => handlePlayerChoice(choice)}
            disabled={!!gameResult}
            size="lg"
            variant="secondary"
            className="w-24 h-24 text-4xl"
          >
            {choiceIcons[choice]}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-around w-full max-w-md text-center">
        <div>
          <h3 className="text-lg font-semibold">You</h3>
          <div className="text-6xl h-24 w-24 flex items-center justify-center">{playerChoice ? choiceIcons[playerChoice] : <Hand />}</div>
          <p className="text-xl font-bold">Score: {playerScore}</p>
        </div>
        <div className="text-3xl font-bold">vs</div>
        <div>
          <h3 className="text-lg font-semibold">Computer</h3>
          <div className="text-6xl h-24 w-24 flex items-center justify-center">{computerChoice ? choiceIcons[computerChoice] : <Hand />}</div>
          <p className="text-xl font-bold">Score: {computerScore}</p>
        </div>
      </div>

      {roundResult && !gameResult && <p className="text-lg font-semibold">{roundResult}</p>}
      
      <GameResultDialog result={gameResult} onPlayAgain={resetGame} />
    </div>
  );
}
