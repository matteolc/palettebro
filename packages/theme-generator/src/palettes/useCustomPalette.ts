import { usePalette } from './usePalette';
import {
  ThemeVariantEnum,
  type ColorShadesPreset,
  type MuiThemePreset,
  type StaticThemePreset,
  type ThemeColorScheme,
  type Themes,
  type ThemeVariant,
} from '../types';

export const useCustomPalette = (props: {
  colors?: Record<string, string>;
  themes: Themes;
  variant?: ThemeVariant;
  isDark?: boolean;
  preset?: StaticThemePreset | MuiThemePreset;
  reverse?: boolean;
  contrast?: number;
  colorShadesPreset?: ColorShadesPreset;
  reverseLightDarkShades?: boolean;
}) => {
  const {
    colors,
    themes,
    variant = ThemeVariantEnum.static,
    isDark,
    preset,
    reverse,
    contrast,
    colorShadesPreset,
    reverseLightDarkShades,
  } = props;

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
        colorShadesPreset,
        reverseLightDarkShades,
        baseColors: {
          ...currentTheme.baseColors,
          ...colors,
        },
      },
    }),
  };
};
