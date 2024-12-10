import spotPalette from "../presets/spotPalette";
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
  reverse: boolean;
  preset: "split-complementary" | "tetrad" | "triad";
  contrast: number;
}) => {
  const { primaryColor, saturation, isDark, lightness, reverse, preset, contrast } = theme;

  const nodes = spotPalette({ saturation, lightness, isDark, reverse, preset, contrast }).nodes

  return presetSampleWithKeyAndNameHash([
    ...presetSamplesWithKeyAndName(nodes, primaryColor),
  ]);
};
