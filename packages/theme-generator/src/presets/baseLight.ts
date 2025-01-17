import lightness from '../nodes/lightness';
import saturation from '../nodes/saturation';
import type { Preset } from './types';

// @see https://m3.material.io/styles/color/the-color-system/tokens
export default {
  label: 'Base light',
  description: 'Base variations for light themes',
  nodes: [
    {
      type: saturation.type,
      token: 'base',
      isHidden: true,
      args: {
        amount: 30,
      },
      children: [
        {
          type: lightness.type,
          token: '$-100',
          args: {
            amount: 95,
          },
        },
        {
          type: lightness.type,
          token: '$-200',
          args: {
            amount: 90,
          },
        },
        {
          type: lightness.type,
          token: '$-300',
          args: {
            amount: 85,
          },
        },
      ],
    },
  ],
} as Preset;
