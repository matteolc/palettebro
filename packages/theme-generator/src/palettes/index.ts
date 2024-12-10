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
    lightness,
    reverse,
    preset,
    contrast,
    baseColors: { primary, secondary, accent },
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

  let secondaryColor;

  if (secondary) {
    const parsed = parseColor(secondary);
    if (parsed[1]) {
      secondaryColor = parsed[1];
      const secondaryColorName = nearestColor(formatSchemistToHex(secondaryColor));
      console.log(
        ` ├─ ${picocolors.green(
          "✔︎"
        )} Generating theme for secondary color: ${picocolors.dim(
          secondaryColorName
        )} (${picocolors.dim(secondary)})`
      );
    }
  }

  let accentColor

  if (accent) {
    const parsed = parseColor(accent);
    if (parsed[1]) {
      accentColor = parsed[1];
      const accentColorName = nearestColor(formatSchemistToHex(accentColor));
      console.log(
        ` ├─ ${picocolors.green(
          "✔︎"
        )} Generating theme for accent color: ${picocolors.dim(
          accentColorName
        )} (${picocolors.dim(accent)})`
      );
    }
  }

  const palette = ThemeVariantToPalette[theme.variant]({
    primaryColor,
    secondaryColor,
    accentColor,
    saturation,
    lightness,
    contrast: contrast ?? 1,
    reverse: reverse ?? false,
    preset: preset ?? "split-complementary",
    isDark: theme["color-scheme"] === ThemeColorSchemeEnum.dark,
  });

  console.dir({ palette }, { depth: null });

  return palette;
};
