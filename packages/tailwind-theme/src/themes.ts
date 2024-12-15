import colors from "tailwindcss/colors";
import type { Themes } from "@repo/theme-generator/types";
import { ThemeVariantEnum } from "@repo/theme-generator/types";

const themeDefaultProps = {
  saturation: 80,
  contrast: 1,
  smooth: true,
  variant: ThemeVariantEnum.mui,
};

const lightThemeDefaultProps = {
  "color-scheme": "light" as const,
  lightness: 98,
  ...themeDefaultProps,
};

const darkThemeDefaultProps = {
  "color-scheme": "dark" as const,
  lightness: 15,
  ...themeDefaultProps,
};

export const themes = {
  light: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.blue[500],
    },
  },
  dark: {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.blue[500],
    },
  },
} satisfies Themes;
