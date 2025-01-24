import { withRetry } from '../utils/with-retry';
import { getGeneratorChain } from './get-palette-name-generator-chain';

export const generatePaletteName = async (props: {
  primary: string;
  secondary: string;
  accent?: string;
}) => {
  const { chain, parser } = getGeneratorChain();
  const { primary, secondary, accent } = props;

  return await withRetry(() =>
    chain.invoke({
      question:
        'Your task is to come up with a compelling name for a color palette composed of primary, secondary, and accent colors. Please generate a unique and evocative name for the color palette.',
      format_instructions: parser.getFormatInstructions(),
      primary_color: primary,
      secondary_color: secondary,
      accent_color: accent,
    }),
  );
};
