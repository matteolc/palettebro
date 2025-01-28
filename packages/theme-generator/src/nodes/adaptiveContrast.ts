import { setLightness, contrastingColor, setHue, setSaturation } from '../color/manipulation';
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
    {
      type: 'range',
      name: 'preserveHue',
      label: 'Preserve Original Hue',
      unit: '%',
      min: 0,
      max: 100,
      default: 30,
    },
  ],
  samples: 'continuous',
  apply(color, { lightAmount, contrastAmount, threshold, preserveHue }) {
    // If color is too light (above threshold), use contrast
    if (color.l > threshold) {
      const contrastedColor = contrastingColor(color, contrastAmount);
      
      // If we want to preserve some of the original hue
      if (preserveHue > 0) {
        // Calculate a weighted average between the original hue and the contrasted hue
        const hueWeight = preserveHue / 100;
        const targetHue = color.h;
        const currentHue = contrastedColor.h;
        
        // Interpolate between the current hue and target hue
        const newHue = currentHue + (targetHue - currentHue) * hueWeight;
        
        // Desaturate slightly to make the color more neutral
        const desaturated = setSaturation(contrastedColor, contrastedColor.s * 0.7);
        
        // Apply the interpolated hue
        return setHue(desaturated, newHue);
      }
      
      return contrastedColor;
    }
    
    // For dark colors, simply use lightness
    return setLightness(color, lightAmount);
  },
} as NodeDef; 