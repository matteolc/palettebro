import color from '../nodes/color';
import lightness from '../nodes/lightness';
import negative from '../nodes/negative';
import saturation from '../nodes/saturation';
import splitComplementaryLeft from '../nodes/splitComplementaryLeft';
import splitComplementaryRight from '../nodes/splitComplementaryRight';
import tetradLeft from '../nodes/tetradLeft';
import tetradRight from '../nodes/tetradRight';
import triadLeft from '../nodes/triadLeft';
import triadRight from '../nodes/triadRight';
import { ColorShadesPresetEnum, type ThemePalette } from '../types';
import background from './background';
import materialScale from './materialScale';
import materialTones from './materialTones';
import outlineScale from './outlineScale';
import rainbow from './rainbow';
import shadowAndScrim from './shadowAndScrim';
import surface from './surface';
import tailwindScale from './tailwindScale';
import bootstrapScale from './bootstrapScale';
import type { Preset } from './types';

export default (options?: ThemePalette) => {
  const scaleNodes = (() => {
    switch (options?.colorShadesPreset) {
      case ColorShadesPresetEnum.mui:
        return materialScale({
          reverseLightDarkShades: options?.reverseLightDarkShades,
        }).nodes;
      case ColorShadesPresetEnum.bootstrap:
        return bootstrapScale({
          reverseLightDarkShades: options?.reverseLightDarkShades,
        }).nodes;
      default:
        return tailwindScale({
          reverseLightDarkShades: options?.reverseLightDarkShades,
        }).nodes;
    }
  })();

  const shadeNodes = [
    ...materialTones({ isDark: options?.isDark ?? false }).nodes,
    ...scaleNodes,
  ];

  const secondaryNode = {
    token: 'secondary',
    children: shadeNodes,
    type: '',
  };
  if (options?.preset === 'split-complementary') {
    secondaryNode.type = options?.reverse
      ? splitComplementaryRight.type
      : splitComplementaryLeft.type;
  } else if (options?.preset === 'tetrad') {
    secondaryNode.type = options?.reverse ? tetradRight.type : tetradLeft.type;
  } else {
    secondaryNode.type = options?.reverse ? triadRight.type : triadLeft.type;
  }

  const accentNode = {
    token: 'accent',
    children: shadeNodes,
    type: '',
  };
  if (options?.preset === 'split-complementary') {
    accentNode.type = options?.reverse
      ? splitComplementaryLeft.type
      : splitComplementaryRight.type;
  } else if (options?.preset === 'tetrad') {
    accentNode.type = options?.reverse ? tetradLeft.type : tetradRight.type;
  } else {
    accentNode.type = options?.reverse ? triadLeft.type : triadRight.type;
  }

  return {
    label: 'Spot palette',
    description: 'A static palette with a primary color',
    nodes: [
      {
        type: color.type,
        isHidden: false,
        token: 'primary',
        args: {
          color: options?.primaryColor,
        },
        children: [
          ...shadeNodes,
          ...rainbow.nodes,
          {
            type: lightness.type,
            token: 'inverse-primary',
            args: {
              amount: options?.isDark ? 40 : 80,
            },
          },
          secondaryNode,
          accentNode,
          {
            type: negative.type,
            token: 'error',
            isHidden: false,
            children: [
              ...materialTones({ isDark: options?.isDark ?? false }).nodes,
            ],
          },
          ...background({ isDark: options?.isDark ?? false }).nodes,
          {
            type: saturation.type,
            isHidden: true,
            args: {
              amount: options?.isDark ? 8 : 12.5,
            },
            children: [
              ...surface({ isDark: options?.isDark ?? false }).nodes,
              ...outlineScale({ isDark: options?.isDark ?? false }).nodes,
              ...shadowAndScrim({ isDark: options?.isDark ?? false }).nodes,
            ],
          },
        ],
      },
    ],
  } as Preset;
};
