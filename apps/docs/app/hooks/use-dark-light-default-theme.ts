import { ThemeVariantEnum, StaticThemePresetEnum } from "@repo/theme-generator/types";
import { useHints } from "./use-hints";
import colors from 'tailwindcss/colors';

export const useDarkLightDefaultTheme = () => {
  const hints = useHints();
  return {
    light: {
      'color-scheme': 'light' as const,
      preset: StaticThemePresetEnum["split-complementary"],
      reverse: false,
      baseColors: {
        primary: colors.purple[500],
      },
    },
    dark: {
      'color-scheme': 'dark' as const,
      preset: StaticThemePresetEnum["split-complementary"],
      reverse: false,
      baseColors: {
        primary: colors.purple[500],
      },
    },
  }[hints.theme];
};
