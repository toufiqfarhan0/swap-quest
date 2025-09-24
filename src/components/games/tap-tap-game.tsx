'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import GameResultDialog from './game-result-dialog';

const GAME_DURATION = 10; // seconds
const WIN_THRESHOLD = 50; // taps

export default function TapTapGame() {
  const [taps, setTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft]);

  const startGame = () => {
    setTaps(0);
    setTimeLeft(GAME_DURATION);
    setIsActive(true);
    setGameResult(null);
  };

  const endGame = () => {
    setIsActive(false);
    if (taps >= WIN_THRESHOLD) {
      setGameResult('win');
    } else {
      setGameResult('lose');
    }
  };

  const handleTap = () => {
    if (isActive) {
      setTaps(taps + 1);
    }
  };

  const handlePlayAgain = () => {
    startGame();
  };
  
  const progress = (timeLeft / GAME_DURATION) * 100;

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-headline">Tap Tap Challenge</h2>
      <p className="text-muted-foreground text-center">
        Tap the button as many times as you can in {GAME_DURATION} seconds.
        <br />
        You need at least <span className="text-primary font-bold">{WIN_THRESHOLD}</span> taps to win 50 credits.
      </p>

      <div className="w-full max-w-sm space-y-4">
        <div className="flex justify-between font-mono text-xl">
          <span>Time: {timeLeft}s</span>
          <span>Taps: {taps}</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {!isActive && !gameResult ? (
        <Button onClick={startGame} size="lg">Start Game</Button>
      ) : (
        <Button
          onClick={handleTap}
          disabled={!isActive}
          size="lg"
          className="w-48 h-48 rounded-full text-2xl font-bold"
        >
          Tap!
        </Button>
      )}

      <GameResultDialog result={gameResult} onPlayAgain={handlePlayAgain} />
    </div>
  );
}
