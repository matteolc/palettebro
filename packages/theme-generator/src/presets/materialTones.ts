import lightness from '../nodes/lightness';
import type { Preset } from './types';

export default (options?: {
  isDark: boolean;
}) => {
  const { isDark } = options ?? { isDark: false };

  return {
    label: 'Material tones',
    description: 'Material Design tone variations',
    nodes: [
      // Primary colors
      {
        type: lightness.type,
        token: '$',
        args: {
          amount: isDark ? 80 : 40,
        },
      },
      {
        type: lightness.type,
        token: 'on-$',
        args: {
          amount: isDark ? 20 : 100,
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