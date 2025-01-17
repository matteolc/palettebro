import { defaultThemeColor } from '../style';
import type { NodeDef } from './types';

export default {
  type: 'clr',
  label: 'Custom color',
  params: [
    {
      type: 'color',
      name: 'color',
      label: 'Color',
      default: defaultThemeColor,
    },
  ],
  samples: 'single',
  apply(_, { color }) {
    return color;
  },
} as NodeDef;
