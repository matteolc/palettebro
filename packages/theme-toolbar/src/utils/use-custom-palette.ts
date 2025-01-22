import { usePalette } from '@palettebro/theme-generator/palettes';
import type {
  MuiThemePreset,
  StaticThemePreset,
  ThemeColorScheme,
  Themes,
  ThemeVariant,
} from '@palettebro/theme-generator/types';

export const useCustomPalette = (props: {
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
        variant,
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
