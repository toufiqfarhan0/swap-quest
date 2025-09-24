'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useCredits } from '@/context/credit-context';
import { PartyPopper, Frown } from 'lucide-react';
import { useEffect } from 'react';

interface GameResultDialogProps {
  result: 'win' | 'lose' | 'draw' | null;
  onPlayAgain: () => void;
}

export default function GameResultDialog({ result, onPlayAgain }: GameResultDialogProps) {
  const { addCredits } = useCredits();

  useEffect(() => {
    if (result === 'win') {
      addCredits(50);
    }
  }, [result, addCredits]);

  const isOpen = result !== null;

  const handlePlayAgain = () => {
    onPlayAgain();
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-center items-center mb-4">
            {result === 'win' && <PartyPopper className="h-16 w-16 text-primary" />}
            {result === 'lose' && <Frown className="h-16 w-16 text-destructive" />}
            {result === 'draw' && <Frown className="h-16 w-16 text-muted-foreground" />}
          </div>
          <AlertDialogTitle className="text-center text-2xl font-headline">
            {result === 'win' && 'You Won!'}
            {result === 'lose' && 'You Lost!'}
            {result === 'draw' && 'It\'s a Draw!'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {result === 'win' && 'Congratulations! You earned 50 credits.'}
            {result === 'lose' && 'Better luck next time. No credits earned.'}
            {result === 'draw' && 'Close game! No credits earned this time.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handlePlayAgain}>Play Again</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
