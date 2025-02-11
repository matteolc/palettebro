import { rotateHue } from '../color/manipulation';
import type { NodeDef } from './types';

export default {
  type: 'anl',
  label: 'Analogous',
  params: [
    {
      type: 'range',
      name: 'steps',
      label: 'Steps',
      min: 1,
      max: 11,
      default: 1,
    },
  ],
  samples: 'discrete',
  apply(color, { steps }) {
    return rotateHue(color, steps * 30);
  },
} as NodeDef;
