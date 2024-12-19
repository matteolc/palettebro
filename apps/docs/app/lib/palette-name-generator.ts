import { z } from "zod";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAIClient } from "~/openai.server";



export const getGeneratorChain = () => {
    const zodSchema = z.object({
        name: z.string().describe("The name of the palette"),
      });
      
      const parser = StructuredOutputParser.fromZodSchema(zodSchema);
      const { llm } = new ChatOpenAIClient({});
      
      const chain = RunnableSequence.from([
        ChatPromptTemplate.fromTemplate(
          "You enjoy creating color palette names from a primary and secondary color.\n{format_instructions}\n{primary_color}\n{secondary_color}\n{question}"
        ),
        llm,
        parser,
      ]);

      return { chain, parser };
}