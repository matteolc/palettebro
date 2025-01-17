import {
  StaticThemePresetEnum,
  type ThemeColorScheme,
} from '@repo/theme-generator/types';
import colors from 'tailwindcss/colors';

export const getDarkLightDefaultTheme = (theme: ThemeColorScheme) => {
  return {
    light: {
      'color-scheme': 'light' as const,
      preset: StaticThemePresetEnum['split-complementary'],
      reverse: false,
      baseColors: {
        primary: colors.purple[500],
      },
    },
    dark: {
      'color-scheme': 'dark' as const,
      preset: StaticThemePresetEnum['split-complementary'],
      reverse: false,
      baseColors: {
        primary: colors.purple[500],
      },
    },
  }[theme];
};
