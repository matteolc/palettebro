import color from '../nodes/color';
import lightness from '../nodes/lightness';
import negative from '../nodes/negative';
import saturation from '../nodes/saturation';
import type { ThemePalette } from '../types';
import background from './background';
import materialScale from './materialScale';
import materialTones from './materialTones';
import outlineScale from './outlineScale';
import rainbow from './rainbow';
import shadowAndScrim from './shadowAndScrim';
import surface from './surface';
import type { Preset } from './types';

export default (
  options?: ThemePalette & { token: 'primary' | 'secondary' | 'accent' },
) => {
  const shadeNodes = [
    ...materialTones({ isDark: options?.isDark ?? false }).nodes,
    ...materialScale({
      reverseLightDarkShades: options?.reverseLightDarkShades,
    }).nodes,
  ];

  const nodes =
    options?.token === 'primary'
      ? [
          ...shadeNodes,
          ...rainbow.nodes,
          {
            type: lightness.type,
            token: 'inverse-primary',
            args: {
              amount: options?.isDark ? 40 : 80,
            },
          },
          {
            type: negative.type,
            token: 'error',
            isHidden: false,
            children: shadeNodes,
          },
          {
            type: saturation.type,
            isHidden: true,
            args: {
              amount: options?.isDark ? 8 : 12.5,
            },
            children: [
              ...background({ isDark: options?.isDark ?? false }).nodes,
              ...surface({ isDark: options?.isDark ?? false }).nodes,
              ...outlineScale({ isDark: options?.isDark ?? false }).nodes,
              ...shadowAndScrim({ isDark: options?.isDark ?? false }).nodes,
            ],
          },
        ]
      : shadeNodes;

  const startColor =
    options?.token === 'primary'
      ? options?.primaryColor
      : options?.token === 'secondary'
        ? options?.secondaryColor
        : options?.accentColor;

  return {
    label: 'Dynamic palette',
    description:
      'A dynamic palette that can generate primary, secondary, or accent color schemes',
    nodes: [
      {
        type: color.type,
        isHidden: false,
        token: options?.token,
        args: {
          color: startColor,
        },
        children: nodes,
      },
    ],
  } as Preset;
};
