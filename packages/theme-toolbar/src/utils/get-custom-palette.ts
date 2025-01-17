import { usePalette } from '@palettebruh/theme-generator/palettes';
import {
  type StaticThemePreset,
  type ThemeColorScheme,
  type ThemeVariant,
  ThemeVariantEnum,
} from '@palettebruh/theme-generator/types';
import { getDarkLightDefaultTheme } from './get-dark-light-default-theme';

export const getCustomPalette = (
  colors: Record<string, string>,
  variant: ThemeVariant = ThemeVariantEnum.static,
  isDark?: boolean,
  preset?: StaticThemePreset,
  reverse?: boolean,
) => {
  const currentTheme = getDarkLightDefaultTheme(isDark ? 'dark' : 'light');

  return {
    palette: usePalette({
      theme: {
        ...currentTheme,
        'color-scheme': isDark ? 'dark' : ('light' as ThemeColorScheme),
        debug: false,
        variant,
        preset,
        reverse,
        baseColors: {
          ...currentTheme.baseColors,
          ...colors,
        },
      },
    }),
  };
};
