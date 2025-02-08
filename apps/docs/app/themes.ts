import type { Themes } from '@palettebro/theme-generator';
import {
  StaticThemePresetEnum,
  ThemeVariantEnum,
} from '@palettebro/theme-generator';
import colors from 'tailwindcss/colors';

export const themes = {
  light: {
    'color-scheme': 'light' as const,
    variant: ThemeVariantEnum.static,
    debug: false,
    preset: StaticThemePresetEnum.tetrad,
    reverse: true,
    baseColors: {
      primary: colors.purple[500],
      secondary: colors.blue[500],
      accent: colors.green[500],
    },
  },
  dark: {
    'color-scheme': 'dark' as const,
    variant: ThemeVariantEnum.static,
    debug: false,
    preset: StaticThemePresetEnum.tetrad,
    reverse: true,
    baseColors: {
      primary: colors.purple[500],
      secondary: colors.blue[500],
      accent: colors.green[500],
    },
  },
} satisfies Themes;
