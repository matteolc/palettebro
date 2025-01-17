import lightness from '../nodes/lightness';
import saturation from '../nodes/saturation';
import type { Preset } from './types';

// @see https://m3.material.io/styles/color/the-color-system/tokens
export default {
  label: 'Material neutral light',
  description: 'Neutral variations for light themes',
  nodes: [
    {
      type: saturation.type,
      token: 'desaturated-$',
      isHidden: true,
      args: {
        amount: 10,
      },
      children: [
        {
          type: lightness.type,
          token: 'surface',
          args: {
            amount: 99,
          },
        },
        {
          type: lightness.type,
          token: 'on-surface',
          args: {
            amount: 10,
          },
        },
        {
          type: lightness.type,
          token: 'surface-variant',
          args: {
            amount: 90,
          },
        },
        {
          type: lightness.type,
          token: 'on-surface-variant',
          args: {
            amount: 30,
          },
        },
        {
          type: lightness.type,
          token: 'outline',
          args: {
            amount: 50,
          },
        },
      ],
    },
  ],
} as Preset;
