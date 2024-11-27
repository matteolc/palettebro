import muiPalette from "./palettes/mui";
import spotPalette from "./palettes/spot";

export type ThemeColorScheme = "light" | "dark";
export type ThemeVariant = "mui" | "spot";

export const createEnum = <T extends readonly string[]>(values: T) => {
  return values.reduce((acc, value) => {
    acc[value as T[number]] = value;
    return acc;
  }, {} as { [key in T[number]]: key });
};

export const ThemeColorSchemeEnum = createEnum(["light", "dark"] as const);
export const ThemeVariantEnum = createEnum(["mui", "spot"] as const);

export const ThemeVariantToPalette = {
  mui: muiPalette,
  spot: spotPalette,
};

export type Theme = {
  "color-scheme": ThemeColorScheme;
  variant: ThemeVariant;
  smooth?: boolean;
  lightness?: number;
  saturation: number;
  contrast?: number;
  ratios?: number[];
  baseColors: {
    primary: string;
    secondary?: string;
    accent?: string;
    neutral?: string;
  };
};

export type Themes = Record<string, Theme>;
