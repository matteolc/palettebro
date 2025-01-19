import type { SchemistColor } from '../types';

export const setHue = (color: SchemistColor, h: number) => ({
  ...color,
  h,
});
