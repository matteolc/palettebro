import lightness from '../nodes/lightness';
import adaptiveContrast from '../nodes/adaptiveContrast';
import type { Preset } from './types';

export default (options?: {
  isDark: boolean;
}) => {
  const { isDark } = options ?? { isDark: false };

  return {
    label: 'Material tones',
    description: 'Material Design tone variations',
    nodes: [
      {
        type: adaptiveContrast.type,
        token: 'on-$',
        args: {
          lightAmount: 100, // Full white in dark mode
          contrastAmount: 80, // Strong contrast if needed
          threshold: 70, // Switch to contrast mode if base color is >70% light
          preserveHue: 30, // Preserve 30% of the original hue to maintain harmony
        },
      },
      {
        type: lightness.type,
        token: '$-container',
        args: {
          amount: isDark ? 30 : 90,
        },
      },
      {
        type: lightness.type,
        token: 'on-$-container',
        args: {
          amount: isDark ? 90 : 30,
        },
      },
    ],
  } as Preset;
}; 