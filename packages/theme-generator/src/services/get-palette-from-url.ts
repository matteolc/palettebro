import { withRetry } from '../utils/with-retry';
import { getPaletteFromUrlChain } from './get-palette-from-url-chain';

export const getPaletteFromUrl = async (props: {
  url: string;
}) => {
  const { chain, parser } = getPaletteFromUrlChain();
  const { url } = props;

  return await withRetry(() =>
    chain.invoke({
      question:
        'Your task is to extract the primary, secondary, and accent colors from the URL of a website. Please provide the hex code for each color.',
      format_instructions: parser.getFormatInstructions(),
      url,
    }),
  );
};
