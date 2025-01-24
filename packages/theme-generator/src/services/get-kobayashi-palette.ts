import { withRetry } from '../utils/with-retry';
import { getKobayashiPaletteChain } from './get-kobayashi-palette-chain';

export const getKobayashiPalette = async (props: {
  image: string;
  word: string;
}) => {
  const { chain, parser } = getKobayashiPaletteChain();
  const { image, word } = props;

  return await withRetry(() =>
    chain.invoke({
      question:
        'Please provide at least 10 color palettes for the image and word following the Kobayashi color system.',
      format_instructions: parser.getFormatInstructions(),
      image,
      word,
    }),
  );
};
