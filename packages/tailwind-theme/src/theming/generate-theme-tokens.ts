import { getPalette } from '@palettebro/theme-generator/palettes';
import type { Theme } from '@palettebro/theme-generator/types';
import { colorToRawOklchString } from '@palettebro/theme-generator';
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
