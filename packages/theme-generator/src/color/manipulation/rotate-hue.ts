import { circular } from '../../utils/math';
import type { SchemistColor } from '../types';

export const rotateHue = ({ h, ...color }: SchemistColor, degrees: number) => ({
  ...color,
  h: circular(h + degrees),
});
