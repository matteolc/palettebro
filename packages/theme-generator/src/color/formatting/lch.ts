import { round } from '../../utils/math';
import type { LchColor } from '../types';

export const formatLch = ({ l, c, h = 0 }: LchColor, precision = 3) =>
  `lch(${l === undefined ? 'none' : `${round(l, precision)}%`} ${
    c === undefined ? 'none' : round(c, precision)
  } ${round(h, precision)})`;
