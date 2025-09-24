'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { generateGameIdeasAction, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold">
      {pending ? (
        'Generating...'
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" /> Generate Ideas
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export function CreateGameForm() {
  const [state, formAction] = useFormState(generateGameIdeasAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (state.message && state.message !== 'Invalid form data.') {
        toast({
            title: state.message.startsWith('An error') ? 'Error' : 'Success',
            description: state.message,
            variant: state.message.startsWith('An error') ? 'destructive' : 'default',
        });
    }
    if (state.data) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="space-y-6">
      <form ref={formRef} action={formAction} className="space-y-4">
        <Textarea
          name="protocolDescription"
          placeholder="e.g., A decentralized lending protocol that allows users to borrow and lend crypto assets with variable interest rates. The theme is futuristic and space-oriented."
          rows={5}
          defaultValue={state.fields?.protocolDescription}
        />
        {state.issues && (
          <div className="text-sm font-medium text-destructive">
            {state.issues.join(', ')}
          </div>
        )}
        <SubmitButton />
      </form>

      {state.data?.gameIdeas && (
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="font-headline">Generated Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm prose-invert max-w-none text-foreground whitespace-pre-wrap">
              {state.data.gameIdeas}
            </div>
          </CardContent>
        </Card>
      )}

      {state.message.startsWith('An error') && (
        <Alert variant="destructive">
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
