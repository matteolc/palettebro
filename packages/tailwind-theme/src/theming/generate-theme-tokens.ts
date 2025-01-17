import { getPalette } from '@palettebruh/theme-generator/palettes';
import type { Theme } from '@palettebruh/theme-generator/types';
import { colorToRawOklchString } from '@palettebruh/theme-generator';
import { DEFAULT_UTILITY_VALUES } from './const';

const generateThemeTokens = (input: Theme) => {
  const result: Record<string, string> = {};
  const palette = getPalette({ theme: input });

  for (const [key, value] of Object.entries(palette)) {
    Object.assign(result, {
      [`--${key}`]: colorToRawOklchString(value.color),
    });
  }

  for (const [variable, value] of Object.entries(DEFAULT_UTILITY_VALUES)) {
    result[variable] = value;
  }

  return result;
};

export { generateThemeTokens };
