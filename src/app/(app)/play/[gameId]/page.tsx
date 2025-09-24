import { games } from '@/lib/data';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GamePage({ params }: { params: { gameId: string } }) {
  const game = games.find((g) => g.id === params.gameId);

  if (!game) {
    notFound();
  }

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
                     <div className="relative h-96 w-full">
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
                    <div className="flex justify-center items-center h-64 bg-background/50 rounded-lg">
                        <p className="text-muted-foreground">[ Simple Playable Game Area ]</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
