import { closestAngle } from '../../utils/math';
import type { SchemistColor } from '../types';

export const closestHue = ({ h }: SchemistColor, target: number) =>
  closestAngle(h, target, 15);
