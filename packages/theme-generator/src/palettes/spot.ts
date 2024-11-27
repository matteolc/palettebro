import spotPaletteDark from "../presets/spotPaletteDark";
import spotPaletteLight from "../presets/spotPaletteLight";
import {
  presetSamplesWithKeyAndName,
  presetSampleWithKeyAndNameHash,
} from "../index";
import type { SchemistColor } from "../color/types";

export default (theme: {
  primaryColor: SchemistColor;
  saturation: number;
  isDark: boolean;
}) => {
  const { primaryColor, saturation, isDark } = theme;

  const nodes = isDark
    ? spotPaletteDark({ saturation }).nodes
    : spotPaletteLight({ saturation }).nodes;

  return presetSampleWithKeyAndNameHash([
    ...presetSamplesWithKeyAndName(nodes, primaryColor),
  ]);
};
