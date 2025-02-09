import type { usePalette } from '@palettebro/theme-generator/client';
import { useCustomPalette } from '@palettebro/theme-generator/client';
import {
  type ColorShadesPreset,
  ColorShadesPresetEnum,
  type MuiThemePreset,
  type StaticThemePreset,
  ThemeColorSchemeEnum,
  type Themes,
  type ThemeVariant,
  ThemeVariantEnum,
} from '@palettebro/theme-generator';
import { createContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_COLOR_SHADES_PRESET,
  DEFAULT_CONTRAST,
  DEFAULT_MUI_PRESET,
  DEFAULT_STATIC_PRESET,
} from '@/const';

export type BaseColors = {
  primary: string;
  secondary?: string;
  accent?: string;
};

type PaletteContextType = {
  palette?: ReturnType<typeof usePalette>;
  setBaseColors?: (c: BaseColors) => void;
  setIsDark?: (isDark: boolean) => void;
  setVariant?: (variant: ThemeVariant) => void;
  setPreset?: (preset: StaticThemePreset | MuiThemePreset) => void;
  setReverse?: (reverse: boolean) => void;
  preset?: StaticThemePreset | MuiThemePreset;
  reverse?: boolean;
  variant?: ThemeVariant;
  isDark?: boolean;
  contrast?: number;
  setContrast?: (contrast: number) => void;
  colorShadesPreset?: ColorShadesPreset;
  setColorShadesPreset?: (preset: ColorShadesPreset) => void;
  reverseLightDarkShades?: boolean;
  setReverseLightDarkShades?: (reverse: boolean) => void;
};

export const PaletteContext = createContext<PaletteContextType>({});

export const PaletteProvider = ({
  lightOrDark,
  themes,
  children,
}: { lightOrDark?: string; themes: Themes; children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(
    lightOrDark === ThemeColorSchemeEnum.dark,
  );
  const theme =
    themes[isDark ? ThemeColorSchemeEnum.dark : ThemeColorSchemeEnum.light];
  const [baseColors, setBaseColorsState] = useState<BaseColors>(
    theme.baseColors,
  );
  const [variant, setVariant] = useState<ThemeVariant>(theme.variant);
  const [preset, setPreset] = useState<StaticThemePreset | MuiThemePreset>(
    theme.preset ?? DEFAULT_STATIC_PRESET,
  );
  const [reverse, setReverse] = useState<boolean>(theme.reverse ?? false);
  const [contrast, setContrast] = useState<number>(
    theme.contrast ?? DEFAULT_CONTRAST,
  );
  const [colorShadesPreset, setColorShadesPreset] = useState<ColorShadesPreset>(
    theme.colorShadesPreset ?? DEFAULT_COLOR_SHADES_PRESET,
  );
  const [reverseLightDarkShades, setReverseLightDarkShades] = useState<boolean>(
    theme.reverseLightDarkShades ?? false,
  );

  const { palette } = useCustomPalette({
    colors: baseColors,
    themes,
    variant,
    isDark,
    preset,
    reverse,
    contrast,
    colorShadesPreset,
    reverseLightDarkShades,
  });

  const contextValue = useMemo(
    () => ({
      palette,
      setBaseColors: (colors: BaseColors) =>
        setBaseColorsState((prev) => ({ ...prev, ...colors })),
      setIsDark,
      isDark,
      variant,
      setVariant,
      reverse,
      setReverse,
      preset,
      setPreset,
      contrast,
      setContrast,
      colorShadesPreset,
      setColorShadesPreset,
      reverseLightDarkShades,
      setReverseLightDarkShades,
    }),
    [
      palette,
      isDark,
      variant,
      reverse,
      preset,
      contrast,
      colorShadesPreset,
      reverseLightDarkShades,
    ],
  );

  useEffect(() => {
    setIsDark(lightOrDark === ThemeColorSchemeEnum.dark);
  }, [lightOrDark]);

  useEffect(() => {
    switch (variant) {
      case ThemeVariantEnum.mui:
        setPreset(theme.preset ?? DEFAULT_MUI_PRESET);
        setColorShadesPreset(
          theme.colorShadesPreset ?? ColorShadesPresetEnum.mui,
        );
        break;
      case ThemeVariantEnum.static:
        setPreset(theme.preset ?? DEFAULT_STATIC_PRESET);
        setColorShadesPreset(
          theme.colorShadesPreset ?? DEFAULT_COLOR_SHADES_PRESET,
        );
        break;
      case ThemeVariantEnum.dynamic:
        setColorShadesPreset(
          theme.colorShadesPreset ?? DEFAULT_COLOR_SHADES_PRESET,
        );
        break;
    }
  }, [variant, theme]);

  return (
    <PaletteContext.Provider value={contextValue}>
      {children}
    </PaletteContext.Provider>
  );
};
