import { usePalette } from "@repo/theme-generator/palettes";
import { createContext, useState } from "react";
import { useCustomPalette } from "./hooks/use-custom-palette";
import { StaticThemePreset, ThemeVariant, ThemeVariantEnum } from "@repo/theme-generator/types";

export type BaseColors = {
  primary: string;
  secondary?: string;
  accent?: string;
  netrual?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
};

type PaletteContextType = {
  palette?: ReturnType<typeof usePalette>;
  setBaseColors?: (c: BaseColors) => void;
  setLightOrDark?: (isDark: boolean) => void;
  setSaturation?: (saturation: number) => void;
  setLightness?: (lightness: number) => void;
  setVariant?: (variant: ThemeVariant) => void;
  setPreset?: (preset: StaticThemePreset) => void;
  setReverse?: (reverse: boolean) => void;
  setContrast?: (contrast: number) => void;
  preset?: StaticThemePreset;
  reverse?: boolean;
  saturation?: number;
  lightness?: number;
  variant?: ThemeVariant;
  contrast?: number;
  isDark?: boolean;
};

export const PaletteContext = createContext<PaletteContextType>({});

export const VariantMap = {
  [ThemeVariantEnum.mui]: "Complementary",
  [ThemeVariantEnum.ai]: "Generative",
  [ThemeVariantEnum.spot]: "Tetrad",
}

export const PaletteProvider = ({ children }: { children: React.ReactNode }) => {
  const [baseColors, setBaseColorsState] = useState<{ primary?: string, secondary?: string, accent?: string }>({
    primary: "#FF0000",
    secondary: "#00FF00",
    accent: "#0000FF",
  });
  const [isDark, setIsDark] = useState(false);
  const [saturation, setSaturation] = useState(80);
  const [variant, setVariant] = useState<ThemeVariant>(ThemeVariantEnum.spot);
  const [lightness, setLightness] = useState(100);
  const [preset, setPreset] = useState<StaticThemePreset>("split-complementary");
  const [reverse, setReverse] = useState<boolean>(false);
  const [contrast, setContrast] = useState<number>(1);
  const { palette } = useCustomPalette(baseColors, isDark, saturation, variant, lightness, preset, reverse, contrast);

  const setBaseColors = (colors: BaseColors) => {
    setBaseColorsState(prev => ({ ...prev, ...colors }));
  };

  const setLightOrDark = (isDark: boolean) => {
    setIsDark(isDark);
  };

  return (
    <PaletteContext.Provider value={{ palette, setBaseColors, setLightOrDark, isDark, saturation, setSaturation, variant, setVariant, lightness, setLightness, reverse, setReverse, preset, setPreset, contrast, setContrast }}>
      <div>
        {children}
      </div>
    </PaletteContext.Provider >
  );
};