'use server';

/**
 * @fileOverview An AI agent that suggests game ideas for protocols.
 *
 * - suggestGameIdeas - A function that suggests game ideas based on a protocol description.
 * - SuggestGameIdeasInput - The input type for the suggestGameIdeas function.
 * - SuggestGameIdeasOutput - The return type for the suggestGameIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestGameIdeasInputSchema = z.object({
  protocolDescription: z
    .string()
    .describe('A short description of the protocol for which to generate game ideas.'),
});
export type SuggestGameIdeasInput = z.infer<typeof SuggestGameIdeasInputSchema>;

const SuggestGameIdeasOutputSchema = z.object({
  gameIdeas: z
    .string()
    .describe('A list of game ideas suitable for the protocol, with short descriptions.'),
});
export type SuggestGameIdeasOutput = z.infer<typeof SuggestGameIdeasOutputSchema>;

export async function suggestGameIdeas(input: SuggestGameIdeasInput): Promise<SuggestGameIdeasOutput> {
  return suggestGameIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestGameIdeasPrompt',
  input: {schema: SuggestGameIdeasInputSchema},
  output: {schema: SuggestGameIdeasOutputSchema},
  prompt: `You are a creative game designer specializing in mini-games for DeFi protocols.

  Based on the following protocol description, generate a list of engaging mini-game ideas that align with the protocol's theme and functionality.
  Each game idea should include a short description.

  Protocol Description: {{{protocolDescription}}}`,
});

const suggestGameIdeasFlow = ai.defineFlow(
  {
    name: 'suggestGameIdeasFlow',
    inputSchema: SuggestGameIdeasInputSchema,
    outputSchema: SuggestGameIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
