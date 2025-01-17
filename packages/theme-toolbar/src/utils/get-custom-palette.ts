import { usePalette } from '@palettebruh/theme-generator/palettes';
import {
  type StaticThemePreset,
  type ThemeColorScheme,
  type Themes,
  type ThemeVariant,
  ThemeVariantEnum,
} from '@palettebruh/theme-generator/types';

export const getCustomPalette = (
  colors: Record<string, string>,
  themes: Themes,
  variant: ThemeVariant = ThemeVariantEnum.static,
  isDark?: boolean,
  preset?: StaticThemePreset,
  reverse?: boolean,
) => {
  const currentTheme = themes[isDark ? 'dark' : 'light'];

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
