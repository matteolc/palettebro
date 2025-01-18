import type { usePalette } from '@palettebruh/theme-generator/palettes';
import {
  type MuiThemePreset,
  type StaticThemePreset,
  type Themes,
  type ThemeVariant,
  ThemeVariantEnum,
} from '@palettebruh/theme-generator/types';
import { createContext, useEffect, useMemo, useState } from 'react';
import { getCustomPalette } from '../utils/get-custom-palette';
import {
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
};

export const PaletteContext = createContext<PaletteContextType>({});

export const PaletteProvider = ({
  lightOrDark,
  themes,
  children,
}: { lightOrDark?: string; themes: Themes; children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(lightOrDark === 'dark');
  const [baseColors, setBaseColorsState] = useState<BaseColors>(
    themes[isDark ? 'dark' : 'light'].baseColors,
  );
  const [variant, setVariant] = useState<ThemeVariant>(ThemeVariantEnum.static);
  const [preset, setPreset] = useState<StaticThemePreset | MuiThemePreset>(
    DEFAULT_STATIC_PRESET,
  );
  const [reverse, setReverse] = useState<boolean>(false);
  const [contrast, setContrast] = useState<number>(DEFAULT_CONTRAST);

  const { palette } = getCustomPalette({
    colors: baseColors,
    themes,
    variant,
    isDark,
    preset,
    reverse,
    contrast,
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
    }),
    [palette, isDark, variant, reverse, preset, contrast],
  );

  useEffect(() => {
    switch (variant) {
      case ThemeVariantEnum.mui:
        setPreset(DEFAULT_MUI_PRESET);
        break;
      case ThemeVariantEnum.static:
        setPreset(DEFAULT_STATIC_PRESET);
        break;
    }
  }, [variant]);

  return (
    <PaletteContext.Provider value={contextValue}>
      {children}
    </PaletteContext.Provider>
  );
};
