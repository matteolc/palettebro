import { setLightness, contrastingColor } from '../color/manipulation';
import type { NodeDef } from './types';

export default {
  type: 'adp',
  label: 'Adaptive Contrast',
  description: 'Uses lightness in dark mode, but falls back to contrast if needed',
  params: [
    {
      type: 'range',
      name: 'lightAmount',
      label: 'Light Amount',
      unit: '%',
      min: 0,
      max: 100,
      default: 100,
    },
    {
      type: 'range',
      name: 'contrastAmount',
      label: 'Contrast Amount',
      unit: '%',
      min: 0,
      max: 100,
      default: 80,
    },
    {
      type: 'range',
      name: 'threshold',
      label: 'Lightness Threshold',
      unit: '%',
      min: 0,
      max: 100,
      default: 50,
    },
  ],
  samples: 'continuous',
  apply(color, { lightAmount, contrastAmount, threshold }) {
    // If color is too light (above threshold), use contrast
    if (color.l > threshold) {
      return contrastingColor(color, contrastAmount);
    }
    // Otherwise use lightness
    return setLightness(color, lightAmount);
  },
} as NodeDef; 