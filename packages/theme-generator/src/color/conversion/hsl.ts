import {
  rgbFromCulori,
  hslFromCulori,
  hslToCulori,
  rgbToCulori,
} from '../culori';
import { convertHslToRgb, convertRgbToHsl } from 'culori/fn';
import type { HslColor, SchemistColor } from '../types';
import { rgbToSchemist, schemistToRgb } from './rgb';

export const hslToSchemist = (color: HslColor): SchemistColor =>
  rgbToSchemist(rgbFromCulori(convertHslToRgb(hslToCulori(color))));

export const schemistToHsl = (color: SchemistColor): HslColor =>
  hslFromCulori(convertRgbToHsl(rgbToCulori(schemistToRgb(color))));
