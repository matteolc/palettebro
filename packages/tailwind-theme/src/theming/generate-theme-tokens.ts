import { colorToRawOklchString } from '../utils/oklch';
import type { Theme } from '@repo/theme-generator/types';
import { DEFAULT_UTILITY_VALUES } from './const';
import { getPalette } from '@repo/theme-generator/palettes';

const generateThemeTokens = (input: Theme) => {
  const result: Record<string, string> = {};
  const palette = getPalette({ theme: input });

  for (const [key, value] of Object.entries(palette)) {
    Object.assign(result, {
      [`--${key}`]: colorToRawOklchString(value.color),
    });
  }

  for (const item of Object.entries(DEFAULT_UTILITY_VALUES)) {
    const [variable, value] = item;
    if (!Object.hasOwn(input, variable)) {
      result[variable] = value;
    }
  }

  return result;
};

export { generateThemeTokens };
