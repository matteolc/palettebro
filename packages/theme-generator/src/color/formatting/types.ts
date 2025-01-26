import { createEnum } from '../../utils';

export type ColorFormat = 'hex' | 'hsl' | 'lch' | 'rgb' | 'okhsl' | 'oklch';

export const COLOR_FORMATS = createEnum([
  'hex',
  'hsl',
  'lch',
  'rgb',
  'okhsl',
  'oklch',
] as const);
