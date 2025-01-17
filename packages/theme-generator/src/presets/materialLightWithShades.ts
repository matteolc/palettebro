import complementary from '../nodes/complementary';
import informative from '../nodes/informative';
import negative from '../nodes/negative';
import positive from '../nodes/positive';
import saturation from '../nodes/saturation';
import tetradLeft from '../nodes/tetradLeft';
import warning from '../nodes/warning';
import baseLight from './baseLight';
import materialNeutralLight from './materialNeutralLight';
import materialTonesLight from './materialTonesLight';
import neutralScaleLight from './neutralScaleLight';
import tailwindScaleLight from './tailwindScaleLight';
import type { Preset } from './types';

export default (options?: { saturation?: number }) =>
  ({
    label: 'Material light',
    description: 'Variations inspired by Material You for light themes',
    nodes: [
      {
        type: saturation.type,
        token: 'primary',
        isHidden: true,
        args: {
          amount: options?.saturation ?? 80,
        },
        children: [
          ...materialTonesLight.nodes,
          ...tailwindScaleLight.nodes,
          {
            type: tetradLeft.type,
            token: 'accent',
            children: [
              ...materialTonesLight.nodes,
              ...tailwindScaleLight.nodes,
            ],
          },
          {
            type: complementary.type,
            token: 'secondary',
            isHidden: true,
            children: [
              ...materialTonesLight.nodes,
              ...tailwindScaleLight.nodes,
            ],
          },
          {
            type: negative.type,
            token: 'error',
            isHidden: false,
            children: [
              ...materialTonesLight.nodes,
              ...tailwindScaleLight.nodes,
            ],
          },
          {
            type: informative.type,
            token: 'info',
            isHidden: false,
            children: [
              ...materialTonesLight.nodes,
              ...tailwindScaleLight.nodes,
            ],
          },
          {
            type: positive.type,
            token: 'success',
            isHidden: false,
            children: [
              ...materialTonesLight.nodes,
              ...tailwindScaleLight.nodes,
            ],
          },
          {
            type: warning.type,
            token: 'warning',
            isHidden: false,
            children: [
              ...materialTonesLight.nodes,
              ...tailwindScaleLight.nodes,
            ],
          },
          {
            type: saturation.type,
            token: 'neutral',
            args: {
              amount: 5,
            },
            children: [
              ...materialTonesLight.nodes,
              ...materialNeutralLight.nodes,
              ...neutralScaleLight.nodes,
              ...baseLight.nodes,
            ],
          },
        ],
      },
    ],
  }) as Preset;
