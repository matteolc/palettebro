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
      question: 'Please generate a name for this color palette.',
      format_instructions: parser.getFormatInstructions(),
      primary_color: primary,
      secondary_color: secondary,
    }),
  );
};
