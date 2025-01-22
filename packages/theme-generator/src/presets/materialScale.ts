import lightness from '../nodes/lightness';
import type { Preset } from './types';
import { MATERIAL_TONES } from '../const';

export default (options?: {
  isDark: boolean;
}) => {
  const { isDark } = options ?? { isDark: false };

  return {
    label: 'Material Scale',
    description: 'Material Design scale with tones from 0 to 100',
    nodes: MATERIAL_TONES.map((tone) => ({
      type: lightness.type,
      token: `$-${tone}`,
      args: {
        amount: isDark ? tone : 100 - tone,
      },
    })),
  } as Preset;
}; 