import { clamp } from '../../utils/math';
import type { SchemistColor } from '../types';

export const contrastingColor = (
  { l, ...color }: SchemistColor,
  amount = 80,
) => {
  const ratio = amount / 100;

  return {
    ...color,
    l: clamp(l > 50 ? l - l * ratio : l + (100 - l) * ratio),
  };
};
