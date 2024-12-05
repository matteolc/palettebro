import { usePalette } from "@repo/theme-generator/palettes";
import { createContext, useState } from "react";
import { useCustomPalette } from "./hooks/use-custom-palette";

type BaseColors = {
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
  isDark?: boolean;
};

export const PaletteContext = createContext<PaletteContextType>({});

export const PaletteProvider = ({ children }: { children: React.ReactNode }) => {
  const [baseColors, setBaseColorsState] = useState<{ primary?: string }>({});
  const [isDark, setIsDark] = useState(false);
  const { palette } = useCustomPalette(baseColors, isDark);

  const setBaseColors = (colors: BaseColors) => {
    setBaseColorsState(prev => ({ ...prev, ...colors }));
  };

  const setLightOrDark = (isDark: boolean) => {
    setIsDark(isDark);
  };

  return (
    <PaletteContext.Provider value={{ palette, setBaseColors, setLightOrDark, isDark }}>
      <div key={JSON.stringify(baseColors)}>
        {children}
      </div>
    </PaletteContext.Provider >
  );
};