import {
  KOBAYASHI_COLOR_COMBINATIONS_MAP,
  KOBAYASHI_COLOR_MAP,
} from '../const';
import type { KobayashiImage } from '../types';

export type GenerateKobayashiParams = {
  image: KobayashiImage;
  word: string;
};

export function generateKobayashi(params: GenerateKobayashiParams) {
  const { image, word } = params;

  // Get the color combinations for the image and word
  const imageMap = KOBAYASHI_COLOR_COMBINATIONS_MAP[image] as Record<
    string,
    string[][]
  >;
  const combinations = imageMap[word] || imageMap.default || [];

  // Convert each combination to HEX colors
  return combinations.map((combination: string[]) => {
    return combination
      .map((colorCode: string) => {
        if (!colorCode) return '';

        // Split the color code into hue and tone (e.g., "R/P" -> ["R", "P"])
        const [hue, tone] = colorCode.split('/') as [
          keyof typeof KOBAYASHI_COLOR_MAP,
          string,
        ];

        // Get the color from the COLOR_MAP
        if (hue === 'N') {
          // Handle neutral colors which have a different structure
          return KOBAYASHI_COLOR_MAP[hue][
            tone as keyof (typeof KOBAYASHI_COLOR_MAP)['N']
          ];
        }

        return KOBAYASHI_COLOR_MAP[hue][
          tone as keyof (typeof KOBAYASHI_COLOR_MAP)[keyof typeof KOBAYASHI_COLOR_MAP]
        ];
      })
      .filter(Boolean); // Remove empty strings
  });
}
