'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import GameResultDialog from './game-result-dialog';
import { cn } from '@/lib/utils';

const questions = [
  {
    question: 'What does "DeFi" stand for?',
    answers: ['Decentralized Finance', 'Digital Finance', 'Distributed Finance', 'Dynamic Finance'],
    correctAnswer: 'Decentralized Finance',
  },
  {
    question: 'Which of the following is a characteristic of a DAO?',
    answers: ['Centralized leadership', 'Community governance', 'Government regulation', 'No voting mechanism'],
    correctAnswer: 'Community governance',
  },
  {
    question: 'What is a "smart contract"?',
    answers: [
      'A legally binding digital document',
      'A self-executing contract with the terms of the agreement directly written into code',
      'A financial derivative',
      'A type of cryptocurrency',
    ],
    correctAnswer: 'A self-executing contract with the terms of the agreement directly written into code',
  },
   {
    question: 'What is impermanent loss?',
    answers: [
      'The temporary loss of funds due to market volatility in a liquidity pool',
      'A permanent loss from a bad investment',
      'The fee paid to liquidity providers',
      'The risk of smart contract failure',
    ],
    correctAnswer: 'The temporary loss of funds due to market volatility in a liquidity pool',
  },
   {
    question: 'Which is a common use case for stablecoins?',
    answers: [
      'High-risk, high-reward investment',
      'A store of value with high volatility',
      'A medium of exchange and unit of account with low volatility',
      'A governance token for a DeFi protocol',
    ],
    correctAnswer: 'A medium of exchange and unit of account with low volatility',
  },
];

export default function QuizGame() {
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof questions>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);

  const totalQuestions = 3;

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, totalQuestions);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setGameResult(null);
  };

  const handleAnswerClick = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === shuffledQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // End of game
        if (score + (answer === shuffledQuestions[currentQuestionIndex].correctAnswer ? 1 : 0) === totalQuestions) {
          setGameResult('win');
        } else {
          setGameResult('lose');
        }
      }
    }, 1500);
  };

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }
  
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-center">DeFi Quiz Challenge!</CardTitle>
          <CardDescription className="text-center">Answer {totalQuestions} questions to win credits.</CardDescription>
          <Progress value={progress} className="w-full mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center font-semibold text-lg">{currentQuestion.question}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.answers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                disabled={isAnswered}
                className={cn(
                  'h-auto py-3 whitespace-normal justify-start text-left',
                  isAnswered && answer === currentQuestion.correctAnswer && 'bg-green-700 hover:bg-green-700',
                  isAnswered && selectedAnswer === answer && answer !== currentQuestion.correctAnswer && 'bg-red-700 hover:bg-red-700'
                )}
                variant="secondary"
              >
                {answer}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {totalQuestions} | Score: {score}
        </CardFooter>
      </Card>
      <GameResultDialog result={gameResult} onPlayAgain={startNewGame} />
    </div>
  );
}
