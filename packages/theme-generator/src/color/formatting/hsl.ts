import { round } from '../../utils/math';
import type { HslColor } from '../types';

export const formatHsl = ({ h = 0, s, l }: HslColor, precision = 3) =>
  `hsl(${round(h, precision)} ${
    s === undefined ? 'none' : `${round(s, precision)}%`
  } ${l === undefined ? 'none' : `${round(l, precision)}%`})`;
