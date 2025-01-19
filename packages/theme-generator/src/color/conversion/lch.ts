import { rgbToSchemist, schemistToRgb } from './rgb';
import {
  rgbFromCulori,
  culoriLchToRgb,
  lchFromCulori,
  culoriRgbToLch,
  lchToCulori,
  rgbToCulori,
} from '../culori';
import { clampChroma } from 'culori/fn';
import type { LchColor, SchemistColor } from '../types';

export const lchToSchemist = (color: LchColor): SchemistColor =>
  rgbToSchemist(rgbFromCulori(culoriLchToRgb(clampChroma(lchToCulori(color)))));

export const schemistToLch = (color: SchemistColor): LchColor =>
  lchFromCulori(culoriRgbToLch(rgbToCulori(schemistToRgb(color))));
