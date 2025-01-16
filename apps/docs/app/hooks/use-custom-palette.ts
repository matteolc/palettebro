import { usePalette } from '@repo/theme-generator/palettes';
import {
  ThemeVariantEnum,
  type StaticThemePreset,
  type ThemeColorScheme,
  type ThemeVariant,
} from '@repo/theme-generator/types';
import { useDarkLightDefaultTheme } from './use-dark-light-default-theme';

const useCustomPalette = (
  colors: Record<string, string>,
  variant: ThemeVariant = ThemeVariantEnum.static,
  isDark?: boolean,
  preset?: StaticThemePreset,
  reverse?: boolean,
) => {
  const currentTheme = useDarkLightDefaultTheme();

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

export { useCustomPalette };
