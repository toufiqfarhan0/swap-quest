import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Award, Users } from 'lucide-react';
import Image from 'next/image';
import { events } from '@/lib/data';

export default function EventsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Protocol Events"
        description="Participate in events from top protocols to earn exclusive rewards."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-primary/20 shadow-md">
             <CardHeader className="p-0">
               <div className="relative h-48 w-full">
                <Image
                  src={event.image.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                  data-ai-hint={event.image.imageHint}
                />
              </div>
               <div className="p-6 pb-2">
                 <Badge variant="outline" className="mb-2">{event.protocol}</Badge>
                <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-6 pt-0 space-y-4">
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                <span>{event.participants} participants</span>
              </div>
               <div className="flex items-center text-sm text-accent font-semibold">
                <Award className="mr-2 h-4 w-4" />
                <span>{event.reward}</span>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button className="w-full font-bold">
                  View Details
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
