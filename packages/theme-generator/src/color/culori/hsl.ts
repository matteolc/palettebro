import {
  type Culori,
  convertLabToLch,
  convertOkhslToOklab,
} from 'culori/fn';
import type { HslColor } from '../types';

const hslFromCulori = ({ h, s, l, alpha }: Culori.Hsl): HslColor => ({
  h: h ?? 0,
  s: s * 100,
  l: l * 100,
  a: alpha,
});

const hslToCulori = ({ h, s, l, a }: HslColor): Culori.Hsl => ({
  mode: 'hsl',
  h,
  s: s / 100,
  l: l / 100,
  alpha: a,
});

const culoriOkhslToOklch = (color: Culori.Okhsl) =>
  convertLabToLch(convertOkhslToOklab(color), 'oklch');

export { hslFromCulori, hslToCulori, culoriOkhslToOklch };
