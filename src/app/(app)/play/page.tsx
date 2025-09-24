import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { games } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PlayPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Play Games"
        description="Play games from top protocols to earn credits and reduce your swap fees."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card key={game.id} className="flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-primary/20 shadow-md">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={game.image.imageUrl}
                  alt={game.title}
                  fill
                  className="object-cover"
                  data-ai-hint={game.image.imageHint}
                />
              </div>
              <div className="p-6 pb-2">
                <Badge variant="outline" className="mb-2">{game.protocol}</Badge>
                <CardTitle className="font-headline text-xl">{game.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-6 pt-0">
              <CardDescription>{game.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link href={`/play/${game.id}`} className='w-full'>
                <Button className="w-full font-bold">
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  Play Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
