import { getPalette } from '@palettebro/theme-generator/palettes';
import type { Theme } from '@palettebro/theme-generator/types';
import { paletteToCssVars } from '@palettebro/theme-generator';
import { DEFAULT_UTILITY_VALUES } from './const';

const generateThemeTokens = (theme: Theme) => {
  const palette = getPalette({ theme });
  const cssVars = paletteToCssVars(palette);

  for (const [variable, value] of Object.entries(DEFAULT_UTILITY_VALUES)) {
    cssVars[variable] = value;
  }

  return cssVars;
};

export { generateThemeTokens };
