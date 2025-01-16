import { ChatOpenAI } from '@langchain/openai';

type ChatOpenAIModel = 'gpt-4o-mini' | 'gpt-4o';

class ChatOpenAIClient {
  llm: ChatOpenAI;

  constructor({
    temperature,
    model,
  }: {
    temperature?: number;
    model?: ChatOpenAIModel;
  }) {
    this.llm = new ChatOpenAI({
      temperature: temperature ?? 0,
      model: model ?? 'gpt-4o-mini',
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
}

export { ChatOpenAIClient };
export type { ChatOpenAIModel };
