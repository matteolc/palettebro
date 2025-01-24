import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { z } from 'zod';
import { ChatOpenAIClient } from './openai';
import { getPaletteTool } from './get-palette-tool';

export const getKobayashiPaletteChain = () => {
  const zodSchema = z.object({
    palette: z.array(z.object({
      primaryColor: z.string().describe('The primary color of the palette'),
      secondaryColor: z.string().describe('The secondary color of the palette'),
      accentColor: z.string().describe('The accent color of the palette'),
      isDark: z.boolean().describe('Whether the palette is dark'),
    })),
  });

  const parser = StructuredOutputParser.fromZodSchema(zodSchema);
  const { llm } = new ChatOpenAIClient({
    temperature: 1.2,
  });

  const chain = RunnableSequence.from([
    ChatPromptTemplate.fromTemplate(
      'You are a talented designer and artist known for your creative and visually striking color palettes. You have extensive experience with the Kobayashi color palette, a color system and chart developed by Japanese color researcher Shigenobu Kobayashi.\n{format_instructions}\n. The image name or meaning of the color palette is {image} and the word that more particularly describes the color palette is {word}.\n{question}',
    ),
    llm,
    parser,
  ]);

  return { chain, parser };
};
