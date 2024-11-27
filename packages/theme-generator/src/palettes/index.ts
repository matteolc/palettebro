import picocolors from "picocolors";
import { formatSchemistToHex } from "../color/formatting";
import { parseColor } from "../color/parsing";
import nearestColor from "../color/nearest";
import { version } from "../../package.json";
import {
  ThemeVariantToPalette,
  type Theme,
  ThemeColorSchemeEnum,
} from "../types";

export const usePalette = (theme: Theme) => {
  console.log(
    "\n",
    `🏄   ${picocolors.magenta("@repo/theme-generator")} ${picocolors.dim(
      version
    )}`
  );

  const {
    saturation,
    baseColors: { primary },
  } = theme;

  const [_, primaryColor] = parseColor(primary);
  if (!primaryColor) {
    return {};
  }
  const primaryColorName = nearestColor(formatSchemistToHex(primaryColor));

  console.log(
    ` ├─ ${picocolors.green(
      "✔︎"
    )} Generating theme for primary color: ${picocolors.dim(
      primaryColorName
    )} (${picocolors.dim(primary)})`
  );

  const palette = ThemeVariantToPalette[theme.variant]({
    primaryColor,
    saturation,
    isDark: theme["color-scheme"] === ThemeColorSchemeEnum.dark,
  });

  console.dir({ palette }, { depth: null });

  return palette;
};
