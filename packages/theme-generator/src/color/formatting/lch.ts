import { round } from '../../utils/math';
import type { LchColor } from '../types';

export const formatLch = ({ l, c, h = 0 }: LchColor, precision = 3) =>
  `lch(${l === undefined ? 'none' : `${round(l, precision)}%`} ${
    c === undefined ? 'none' : round(c, precision)
  } ${round(h, precision)})`;

export function clean(value: number, precision = 2): number {
  return (
    Math.round(
      Number.parseFloat((value * 10 ** precision).toFixed(precision)),
    ) /
    10 ** precision
  );
}

export function toPercent(value: number): string {
  return `${clean(100 * value)}%`
}