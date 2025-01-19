import {
  type Culori,
  convertLabToRgb,
  convertLchToLab,
  convertOklabToRgb,
} from 'culori/fn';
import type { LchColor } from '../types';
import { modeLch } from './modes';

const lchFromCulori = ({ l, c, h, alpha }: Culori.Lch): LchColor => ({
  l,
  c: (c / modeLch.ranges.c[1]) * 100,
  h: h ?? 0,
  a: alpha,
});

const lchToCulori = ({ l, c, h, a }: LchColor): Culori.Lch => ({
  mode: 'lch',
  l,
  c: (c / 100) * modeLch.ranges.c[1],
  h,
  alpha: a,
});

const culoriLchToRgb = (color: Culori.Lch) =>
  convertLabToRgb(convertLchToLab(color));

const culoriOklchToRgb = (color: Culori.Oklch) =>
  convertOklabToRgb(convertLchToLab(color, 'oklab'));

export { lchFromCulori, lchToCulori, culoriLchToRgb, culoriOklchToRgb };
