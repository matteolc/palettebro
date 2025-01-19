import type { SchemistColor } from '../types';

export const setSaturation = (color: SchemistColor, s: number) => ({
  ...color,
  s,
});
