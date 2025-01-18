import type { SchemistColor } from '../color/types';
import {
  presetSampleWithKeyAndNameHash,
  presetSamplesWithKeyAndName,
} from '../index';
import materialDarkWithShades from '../presets/materialDarkWithShades';
import materialLightWithShades from '../presets/materialLightWithShades';
import semanticPairs from '../presets/semanticPairs';
import type { StaticThemePreset } from '../types';

export default (theme: {
  primaryColor: SchemistColor;
  secondaryColor?: SchemistColor;
  accentColor?: SchemistColor;
  isDark: boolean;
  reverse: boolean;
  preset: StaticThemePreset;
}) => {
  const { primaryColor, isDark } = theme;

  const nodes = isDark
    ? materialDarkWithShades().nodes
    : materialLightWithShades().nodes;

  return presetSampleWithKeyAndNameHash([
    ...presetSamplesWithKeyAndName(nodes, primaryColor),
    ...presetSamplesWithKeyAndName(semanticPairs.nodes, primaryColor),
  ]);
};
