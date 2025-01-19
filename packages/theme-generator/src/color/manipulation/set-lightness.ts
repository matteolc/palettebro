import type { SchemistColor } from '../types';

export const setLightness = (color: SchemistColor, l: number) => ({
  ...color,
  l,
});
