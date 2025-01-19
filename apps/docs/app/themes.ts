import type { Themes } from '@palettebruh/theme-generator/types';
import { StaticThemePresetEnum, ThemeVariantEnum } from '@palettebruh/theme-generator/types';
import colors from 'tailwindcss/colors';

export const themes = {
  light: {
    'color-scheme': 'light' as const,
    variant: ThemeVariantEnum.static,
    debug: true,
    preset: StaticThemePresetEnum['split-complementary'],
    baseColors: {
      primary: colors.purple[500],
      secondary: colors.blue[500],
      accent: colors.green[500],
    },
  },
  dark: {
    'color-scheme': 'dark' as const,
    variant: ThemeVariantEnum.static,
    debug: true,
    preset: StaticThemePresetEnum['split-complementary'],
    baseColors: {
      primary: colors.purple[500],
      secondary: colors.blue[500],
      accent: colors.green[500],
    },
  },
} satisfies Themes;
