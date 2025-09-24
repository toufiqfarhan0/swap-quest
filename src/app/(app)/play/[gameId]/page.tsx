import { games } from '@/lib/data';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import TicTacToe from '@/components/games/tic-tac-toe';
import RockPaperScissors from '@/components/games/rock-paper-scissors';
import TapTapGame from '@/components/games/tap-tap-game';
import QuizGame from '@/components/games/quiz-game';

const gameComponents: { [key: string]: React.ComponentType } = {
  'tic-tac-toe': TicTacToe,
  'rock-paper-scissors': RockPaperScissors,
  'tap-tap-game': TapTapGame,
  'quiz-game': QuizGame,
};

export default function GamePage({ params }: { params: { gameId: string } }) {
  const game = games.find((g) => g.id === params.gameId);

  if (!game) {
    notFound();
  }

  const GameComponent = gameComponents[game.id] || null;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
       <PageHeader title={game.title} description={`A mini-game from ${game.protocol}.`}>
         <Button asChild variant="outline">
            <Link href="/play">
              <ArrowLeft className="mr-2" />
              Back to Games
            </Link>
         </Button>
       </PageHeader>
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader className='p-0'>
                     <div className="relative h-64 w-full">
                        <Image
                        src={game.image.imageUrl}
                        alt={game.title}
                        fill
                        className="object-cover rounded-t-lg"
                        data-ai-hint={game.image.imageHint}
                        />
                    </div>
                </CardHeader>
                <CardContent className='p-6'>
                    {GameComponent ? <GameComponent /> : (
                         <div className="flex justify-center items-center h-64 bg-background/50 rounded-lg">
                            <p className="text-muted-foreground">[ Simple Playable Game Area ]</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
