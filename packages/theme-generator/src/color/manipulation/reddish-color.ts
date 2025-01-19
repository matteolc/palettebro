import { closestHue } from './closest-hue';
import type { SchemistColor } from '../types';
import { setHue } from './set-hue';

export const reddishColor = (color: SchemistColor, target = 25) =>
  setHue(color, closestHue(color, target));
