import { closestHue } from './closest-hue';
import type { SchemistColor } from '../types';
import { setHue } from './set-hue';

export const greenishColor = (color: SchemistColor, target = 144) =>
  setHue(color, closestHue(color, target));
