import colors from "tailwindcss/colors";
import { BASE_RATIOS } from "./utils/use-palette";
import type { Themes } from "@repo/theme-generator/types";
import { ThemeVariantEnum } from "@repo/theme-generator/types";

const themeDefaultProps = {
  saturation: 80,
  contrast: 1,
  smooth: true,
  ratios: BASE_RATIOS,
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
  "light-dim": {
    ...lightThemeDefaultProps,
    saturation: 40,
    baseColors: {
      primary: colors.blue[500],
    },
  },
  "dark-dim": {
    ...darkThemeDefaultProps,
    saturation: 40,
    baseColors: {
      primary: colors.blue[500],
    },
  },
  lime: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.lime[500],
    },
  },
  "lime-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.lime[500],
    },
  },
  rose: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.rose[500],
    },
  },
  "rose-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.rose[500],
    },
  },
  amber: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.amber[500],
    },
  },
  "amber-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.amber[500],
    },
  },
  emerald: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.emerald[500],
    },
  },
  "emerald-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.emerald[500],
    },
  },
  cyan: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.cyan[500],
    },
  },
  "cyan-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.cyan[500],
    },
  },
  fuchsia: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.fuchsia[500],
    },
  },
  "fuchsia-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.fuchsia[500],
    },
  },
  indigo: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.indigo[500],
    },
  },
  "indigo-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.indigo[500],
    },
  },
  orange: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.orange[500],
    },
  },
  "orange-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.orange[500],
    },
  },
  pink: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.pink[500],
    },
  },
  "pink-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.pink[500],
    },
  },
  purple: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.purple[500],
    },
  },
  "purple-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.purple[500],
    },
  },
  red: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.red[500],
    },
  },
  "red-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.red[500],
    },
  },
  sky: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.sky[500],
    },
  },
  "sky-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.sky[500],
    },
  },
  teal: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.teal[500],
    },
  },
  "teal-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.teal[500],
    },
  },
  violet: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.violet[500],
    },
  },
  "violet-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.violet[500],
    },
  },
  yellow: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.yellow[500],
    },
  },
  "yellow-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.yellow[500],
    },
  },
  gray: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.gray[500],
    },
  },
  "gray-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.gray[500],
    },
  },
  zinc: {
    ...lightThemeDefaultProps,
    baseColors: {
      primary: colors.zinc[500],
    },
  },
  "zinc-dark": {
    ...darkThemeDefaultProps,
    baseColors: {
      primary: colors.zinc[500],
    },
  },
  "purple-spot": {
    ...lightThemeDefaultProps,
    variant: ThemeVariantEnum.spot,
    baseColors: {
      primary: "#845ec2",
    },
  },
} satisfies Themes;
