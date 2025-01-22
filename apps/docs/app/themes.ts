import type { Themes } from '@palettebro/theme-generator/types';
import { MuiThemePresetEnum, StaticThemePresetEnum, ThemeVariantEnum } from '@palettebro/theme-generator/types';
import colors from 'tailwindcss/colors';

export const themes = {
  light: {
    'color-scheme': 'light' as const,
    variant: ThemeVariantEnum.mui,
    debug: false,
    preset: MuiThemePresetEnum['fruit-salad'],
    baseColors: {
      primary: colors.purple[500],
      secondary: colors.blue[500],
      accent: colors.green[500],
    },
  },
  dark: {
    'color-scheme': 'dark' as const,
    variant: ThemeVariantEnum.mui,
    debug: false,
    preset: MuiThemePresetEnum['fruit-salad'],
    baseColors: {
      primary: colors.purple[500],
      secondary: colors.blue[500],
      accent: colors.green[500],
    },
  },
} satisfies Themes;
