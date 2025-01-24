import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { z } from 'zod';
import { ChatOpenAIClient } from './openai';

export const getGeneratorChain = () => {
  const zodSchema = z.object({
    name: z.string().describe('The name of the palette'),
  });

  const parser = StructuredOutputParser.fromZodSchema(zodSchema);
  const { llm } = new ChatOpenAIClient({
    temperature: 2,
  });

  const chain = RunnableSequence.from([
    ChatPromptTemplate.fromTemplate(
      'You are a talented designer and artist known for your creative and visually striking color palettes.\n{format_instructions}\n{primary_color}\n{secondary_color}\n{accent_color}\n{question}',
    ),
    llm,
    parser,
  ]);

  return { chain, parser };
};
