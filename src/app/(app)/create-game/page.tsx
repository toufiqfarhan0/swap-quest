import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreateGameForm } from './_components/create-game-form';
import { Lightbulb } from 'lucide-react';

export default function CreateGamePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Game Idea Generator"
        description="Use our AI agent to brainstorm mini-game ideas for your protocol."
      />

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Lightbulb className="text-accent" />
              Describe Your Protocol
            </CardTitle>
            <CardDescription>
              Provide a short description of your protocol's theme and
              functionality. Our AI will suggest engaging mini-games that align
              with your project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateGameForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
