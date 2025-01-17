import { setSaturation } from '../color/manipulation';
import type { NodeDef } from './types';

export default {
  type: 's',
  label: 'Saturation',
  argsLabel: ({ amount }) => `${amount}%`,
  description: 'Adjusts color vividness',
  params: [
    {
      type: 'range',
      name: 'amount',
      label: 'Amount',
      unit: '%',
      min: 0,
      max: 100,
      default: 50,
    },
  ],
  samples: 'continuous',
  apply(color, { amount }) {
    return setSaturation(color, amount);
  },
} as NodeDef;
