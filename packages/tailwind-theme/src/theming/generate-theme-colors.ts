import { colorToRawOklchString } from "../utils/oklch";
import type { Theme } from "@repo/theme-generator/types";
import { DEFAULT_UTILITY_VALUES } from "./const";
import { usePalette } from "@repo/theme-generator/palettes";

const generateThemeColors = (input: Theme) => {
  const result: Record<string, string> = {};
  const palette = usePalette(input);

  for (const [key, value] of Object.entries(palette)) {
    Object.assign(result, {
      [`--${key}`]: colorToRawOklchString(value.color),
    });
  }

  // add css variables
  for (const item of Object.entries(DEFAULT_UTILITY_VALUES)) {
    const [variable, value] = item;
    if (!Object.hasOwn(input, variable)) {
      result[variable] = value;
    }
  }

  //   if (!Object.hasOwn(input, "ring")) {
  //     result["--r"] = DEFAULT_COLORS["--r"];
  //   }

  //   // add other custom styles
  //   if (!Object.hasOwn(cssColorVariables, rule)) {
  //     result[rule as keyof typeof result] = value as string;
  //   }
  // }

  console.dir(result, { depth: null });
  return result;
};

export { generateThemeColors };
