import { closestHue } from './closest-hue';
import type { SchemistColor } from '../types';
import { setHue } from './set-hue';

export const orangeishColor = (color: SchemistColor, target = 57) =>
  setHue(color, closestHue(color, target));
