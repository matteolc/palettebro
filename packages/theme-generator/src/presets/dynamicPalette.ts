import type { SchemistColor } from '../color/types';
import color from '../nodes/color';
import highlight from '../nodes/highlight';
import informative from '../nodes/informative';
import negative from '../nodes/negative';
import positive from '../nodes/positive';
import saturation from '../nodes/saturation';
import warning from '../nodes/warning';
import baseLight from './baseLight';
import materialNeutralLight from './materialNeutralLight';
import materialTonesLight from './materialTonesLight';
import neutralScaleLight from './neutralScaleLight';
import rainbow from './rainbow';
import states from './states';
import staticTones from './staticTones';
import tailwindScaleDark from './tailwindScaleDark';
import tailwindScaleLight from './tailwindScaleLight';
import type { Preset } from './types';

export default (options?: {
  token: 'primary' | 'secondary' | 'accent';
  primaryColor?: SchemistColor;
  secondaryColor?: SchemistColor;
  accentColor?: SchemistColor;
  isDark: boolean;
  saturation?: number;
  lightness?: number;
}) => {
  const lightNodes = [
    ...staticTones.nodes,
    ...states.nodes,
    ...tailwindScaleLight.nodes,
  ];

  const darkNodes = [
    ...staticTones.nodes,
    ...states.nodes,
    ...tailwindScaleDark.nodes,
  ];

  const shadeNodes = options?.isDark ? darkNodes : lightNodes;

  const nodes =
    options?.token === 'primary'
      ? [
          ...shadeNodes,
          ...rainbow.nodes,
          {
            type: saturation.type,
            isHidden: true,
            args: {
              amount: 30,
            },
            children: [
              ...baseLight.nodes,
              {
                type: highlight.type,
                isHidden: false,
                token: 'neutral',
                args: {
                  amount: 5,
                },
                children: shadeNodes,
              },
            ],
          },
          {
            type: negative.type,
            token: 'error',
            isHidden: false,
            children: shadeNodes,
          },
          {
            type: informative.type,
            token: 'info',
            isHidden: false,
            children: shadeNodes,
          },
          {
            type: positive.type,
            token: 'success',
            isHidden: false,
            children: shadeNodes,
          },
          {
            type: warning.type,
            token: 'warning',
            isHidden: false,
            children: shadeNodes,
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
    label: 'Spot palette',
    description: 'A static palette with a primary color',
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
