import { usePalette } from '@palettebruh/theme-generator/palettes';
import {
  ThemeVariantEnum,
  type MuiThemePreset,
  type StaticThemePreset,
  type ThemeColorScheme,
  type Themes,
  type ThemeVariant,
} from '@palettebruh/theme-generator/types';

export const getCustomPalette = (props: {
  colors: Record<string, string>;
  themes: Themes;
  variant: ThemeVariant;
  isDark?: boolean;
  preset?: StaticThemePreset | MuiThemePreset;
  reverse?: boolean;
  contrast?: number;
}) => {
  const { colors, themes, variant, isDark, preset, reverse, contrast } = props;

  const currentTheme = themes[isDark ? 'dark' : 'light'];

  return {
    palette: usePalette({
      theme: {
        ...currentTheme,
        'color-scheme': isDark ? 'dark' : ('light' as ThemeColorScheme),
        debug: false,
        variant: variant ?? ThemeVariantEnum.static,
        preset,
        reverse,
        contrast,
        baseColors: {
          ...currentTheme.baseColors,
          ...colors,
        },
      },
    }),
  };
};
