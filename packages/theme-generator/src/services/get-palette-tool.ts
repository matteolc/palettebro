import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { extractWebContent } from './extract-palette-from-url';

export const getPaletteTool = new DynamicStructuredTool({
  name: 'palette_tool',
  description: 'Can extract colors from a website.',
  schema: z.object({
    url: z.string().describe('The URL of the website to extract colors from'),
  }),
  func: async ({ url }) => {
    // First extract the web content and colors
    const { colors } = await extractWebContent(url);
    
    return {
      extractedColors: Array.from(colors)
    };
  },
});
