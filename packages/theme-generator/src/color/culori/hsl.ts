import {
  type Hsl,
  type Okhsl,
  convertLabToLch,
  convertOkhslToOklab,
} from 'culori';
import type { HslColor } from '../types';

const hslFromCulori = ({ h, s, l, alpha }: Hsl): HslColor => ({
  h: h ?? 0,
  s: s * 100,
  l: l * 100,
  a: alpha,
});

const hslToCulori = ({ h, s, l, a }: HslColor): Hsl => ({
  mode: 'hsl',
  h,
  s: s / 100,
  l: l / 100,
  alpha: a,
});

const culoriOkhslToOklch = (color: Okhsl) =>
  convertLabToLch(convertOkhslToOklab(color), 'oklch');

export { hslFromCulori, hslToCulori, culoriOkhslToOklch };
