import { usePalette } from "@repo/theme-generator/palettes";
import { createContext, useState } from "react";
import { useCustomPalette } from "./hooks/use-custom-palette";
import { StaticThemePreset, ThemeVariant, ThemeVariantEnum } from "@repo/theme-generator/types";

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
  setPreset?: (preset: StaticThemePreset) => void;
  setReverse?: (reverse: boolean) => void;
  preset?: StaticThemePreset;
  reverse?: boolean;
  variant?: ThemeVariant;
  isDark?: boolean;
};

export const PaletteContext = createContext<PaletteContextType>({});

export const PaletteProvider = ({ children }: { children: React.ReactNode }) => {
  const [baseColors, setBaseColorsState] = useState<BaseColors>({
    primary: "#663399",
    secondary: "#7da9c3",
    accent: "#e8d5b5",
  });
  const [isDark, setIsDark] = useState<boolean>(false);
  const [variant, setVariant] = useState<ThemeVariant>(ThemeVariantEnum.static);
  const [preset, setPreset] = useState<StaticThemePreset>("split-complementary");
  const [reverse, setReverse] = useState<boolean>(false);
  const { palette } = useCustomPalette(baseColors, variant, isDark, preset, reverse);

  const setBaseColors = (colors: BaseColors) => {
    setBaseColorsState(prev => ({ ...prev, ...colors }));
  };

  return (
    <PaletteContext.Provider value={{ palette, setBaseColors, setIsDark, isDark, variant, setVariant, reverse, setReverse, preset, setPreset }}>
      <div>
        {children}
      </div>
    </PaletteContext.Provider >
  );
};