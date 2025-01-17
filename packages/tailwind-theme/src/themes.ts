import type { Themes } from '@palettebruh/theme-generator/types';
import { ThemeVariantEnum } from '@palettebruh/theme-generator/types';
import colors from 'tailwindcss/colors';

export const themes = {
  light: {
    'color-scheme': 'light' as const,
    variant: ThemeVariantEnum.static,
    baseColors: {
      primary: colors.purple[500],
    },
  },
  dark: {
    'color-scheme': 'dark' as const,
    variant: ThemeVariantEnum.static,
    baseColors: {
      primary: colors.purple[500],
    },
  },
} satisfies Themes;
