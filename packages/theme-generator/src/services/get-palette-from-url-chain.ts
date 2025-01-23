import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { z } from 'zod';
import { ChatOpenAIClient } from './openai';
import { getPaletteTool } from './get-palette-tool';

export const getPaletteFromUrlChain = () => {
  const zodSchema = z.object({
    primaryColor: z.string().describe('The primary color of the palette'),
    secondaryColor: z.string().describe('The secondary color of the palette'),
    accentColor: z.string().describe('The accent color of the palette'),
    isDark: z.boolean().describe('Whether the palette is dark'),
  });

  const parser = StructuredOutputParser.fromZodSchema(zodSchema);
  const { llm } = new ChatOpenAIClient({
    temperature: 1.2,
  });

  const llmWithTools = llm.bindTools([getPaletteTool]);

  const chain = RunnableSequence.from([
    ChatPromptTemplate.fromTemplate(
      'You are a talented designer and artist known for your creative and visually striking color palettes.\n{format_instructions}\n{url}\n{question}',
    ),
    llmWithTools,
    parser,
  ]);

  return { chain, parser };
};
