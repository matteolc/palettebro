import materialDarkWithShades from "../presets/materialDarkWithShades";
import materialLightWithShades from "../presets/materialLightWithShades";
import semanticPairs from "../presets/semanticPairs";
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
  isDark: boolean;
}) => {
  const { primaryColor, saturation, isDark } = theme;

  const nodes = isDark
    ? materialDarkWithShades({ saturation }).nodes
    : materialLightWithShades({ saturation }).nodes;

  return presetSampleWithKeyAndNameHash([
    ...presetSamplesWithKeyAndName(nodes, primaryColor),
    ...presetSamplesWithKeyAndName(semanticPairs.nodes, primaryColor),
  ]);
};
