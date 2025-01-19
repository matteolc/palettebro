import { circular } from '../../utils/math';
import { temperatureToHue } from '../manipulation';
import type { SchemistColor } from '../types';
import { scaleLightness } from './scale-lightness';

export const shadowColor = (
  color: SchemistColor,
  temp: number,
  amount = 25,
  hueShiftAmount = 15,
) =>
  scaleLightness(
    color,
    -amount,
    circular(temperatureToHue(temp) + 180),
    hueShiftAmount,
  );
