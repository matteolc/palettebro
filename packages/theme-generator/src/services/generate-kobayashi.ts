import {
  KOBAYASHI_COLOR_COMBINATIONS_MAP,
} from '../const';
import type { KobayashiImage } from '../types';
import { parseKobayashiColorCode } from '../utils/parse-kobayashi-color-code';
import { getKobayashiPalette } from './get-kobayashi-palette';

export type GenerateKobayashiParams = {
  image: KobayashiImage;
  word: string;
  generative: boolean;
};

export async function generateKobayashi(params: GenerateKobayashiParams) {
  const { image, word, generative } = params;

  if (generative) {
    const response = await getKobayashiPalette({ image, word });
    const results = response.palette.map((item) => ({
      palette: [item.primaryColor, item.secondaryColor, item.accentColor],
    }));
    return { results };
  }

  // Get the color combinations for the image and word
  const imageMap = KOBAYASHI_COLOR_COMBINATIONS_MAP[image] as Record<
    string,
    string[][]
  >;
  const combinations = imageMap[word] || imageMap.default || [];

  // Convert each combination to HEX colors and format as results
  const results = combinations.map((combination: string[]) => {
    const palette = combination
      .map(parseKobayashiColorCode)
      .filter(Boolean); // Remove empty strings

    return { palette };
  });

  return { results };
}
