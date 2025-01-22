import type { SchemistColor } from '../color/types';
import {
  presetSampleWithKeyAndNameHash,
  presetSamplesWithKeyAndName,
} from '../index';
import dynamicPalette from '../presets/dynamicPalette';
import semanticPairs from '../presets/semanticPairs';
import type { ThemePalette } from '../types';

export const getDynamicPalette = (theme: ThemePalette) => {
  const {
    primaryColor,
    secondaryColor,
    accentColor,
  } = theme;

  return presetSampleWithKeyAndNameHash([
    ...presetSamplesWithKeyAndName(
      dynamicPalette({
        token: 'primary',
        ...theme,
      }).nodes,
      primaryColor,
    ),
    ...presetSamplesWithKeyAndName(semanticPairs.nodes, primaryColor),
    ...(secondaryColor
      ? [
          ...presetSamplesWithKeyAndName(
            dynamicPalette({
              token: 'secondary',
              ...theme,
            }).nodes,
            secondaryColor,
          ),
        ]
      : []),
    ...(accentColor
      ? [
          ...presetSamplesWithKeyAndName(
            dynamicPalette({
              token: 'accent',
              ...theme,
            }).nodes,
            accentColor,
          ),
        ]
      : []),
  ]);
};
