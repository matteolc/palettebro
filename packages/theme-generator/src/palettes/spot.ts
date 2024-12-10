import spotPaletteDark from "../presets/spotPaletteDark";
import spotPaletteLight from "../presets/spotPaletteLight";
import {
  presetSamplesWithKeyAndName,
  presetSampleWithKeyAndNameHash,
} from "../index";
import type { SchemistColor } from "../color/types";

export default (theme: {
  primaryColor: SchemistColor;
  secondaryColor?: SchemistColor;
  accentColor?: SchemistColor;
  saturation: number;
  lightness?: number;
  isDark: boolean;
}) => {
  const { primaryColor, saturation, isDark, lightness } = theme;

  const nodes = isDark
    ? spotPaletteDark({ saturation, lightness }).nodes
    : spotPaletteLight({ saturation, lightness }).nodes;

  return presetSampleWithKeyAndNameHash([
    ...presetSamplesWithKeyAndName(nodes, primaryColor),
  ]);
};
