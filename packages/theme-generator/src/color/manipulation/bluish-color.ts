import { closestHue } from './closest-hue';
import type { SchemistColor } from '../types';
import { setHue } from './set-hue';

export const blueishColor = (color: SchemistColor, target = 244) =>
  setHue(color, closestHue(color, target));
