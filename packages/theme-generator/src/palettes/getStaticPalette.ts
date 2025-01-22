import type { SchemistColor } from '../color/types';
import {
  presetSampleWithKeyAndNameHash,
  presetSamplesWithKeyAndName,
} from '../index';
import staticPalette from '../presets/staticPalette';
import type { StaticThemePreset } from '../types';

export const getStaticPalette = (theme: {
  primaryColor: SchemistColor;
  secondaryColor?: SchemistColor;
  accentColor?: SchemistColor;
  isDark: boolean;
  reverse: boolean;
  preset: StaticThemePreset;
}) => {
  const { primaryColor, isDark, reverse, preset } = theme;

  const nodes = staticPalette({ primaryColor, isDark, reverse, preset }).nodes;

  return presetSampleWithKeyAndNameHash([
    ...presetSamplesWithKeyAndName(nodes, primaryColor),
  ]);
};
