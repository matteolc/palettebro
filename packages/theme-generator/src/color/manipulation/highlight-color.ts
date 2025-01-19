import { temperatureToHue } from '../manipulation';
import type { SchemistColor } from '../types';
import { scaleLightness } from './scale-lightness';

export const highlightColor = (
  color: SchemistColor,
  temp: number,
  amount = 25,
  hueShiftAmount = 15,
) => scaleLightness(color, amount, temperatureToHue(temp), hueShiftAmount);
