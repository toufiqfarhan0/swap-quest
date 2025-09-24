'use server';

import {
  suggestGameIdeas,
  type SuggestGameIdeasOutput,
} from '@/ai/flows/suggest-game-ideas';
import { z } from 'zod';

const formSchema = z.object({
  protocolDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters long.')
    .max(500, 'Description must be 500 characters or less.'),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: SuggestGameIdeasOutput;
};

export async function generateGameIdeasAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid form data.',
      issues,
      fields: {
        protocolDescription: formData.protocolDescription as string,
      },
    };
  }

  try {
    const result = await suggestGameIdeas(parsed.data);
    if (result?.gameIdeas) {
      return { message: 'Successfully generated ideas.', data: result };
    }
    return {
      message: 'Failed to generate ideas. The AI returned no content.',
    };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred.';
    return {
      message: `An error occurred: ${errorMessage}`,
    };
  }
}
