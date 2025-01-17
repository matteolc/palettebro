import type { SchemistColor } from '../color/types';
import {
  presetSampleWithKeyAndNameHash,
  presetSamplesWithKeyAndName,
} from '../index';
import staticPalette from '../presets/staticPalette';

export default (theme: {
  primaryColor: SchemistColor;
  secondaryColor?: SchemistColor;
  accentColor?: SchemistColor;
  isDark: boolean;
  reverse: boolean;
  preset: 'split-complementary' | 'tetrad' | 'triad';
}) => {
  const { primaryColor, isDark, reverse, preset } = theme;

  const nodes = staticPalette({ primaryColor, isDark, reverse, preset }).nodes;

  return presetSampleWithKeyAndNameHash([
    ...presetSamplesWithKeyAndName(nodes, primaryColor),
  ]);
};
