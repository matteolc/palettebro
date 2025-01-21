import { rgbToCulori } from '../culori';
import { culoriRgbToOkhsl, culoriRgbToOklch } from '../culori';
import type { Culori } from 'culori/fn';
import { rgbFromCulori } from '../culori';
import { culoriOklchToRgb } from '../culori';
import { culoriOkhslToOklch } from '../culori';
import type { RgbColor, SchemistColor } from '../types';

const schemistToRgb = ({ h, s, l, a }: SchemistColor): RgbColor => {
  const hsl: Culori.Okhsl = {
    mode: 'okhsl',
    h,
    s: s / 100,
    l: l / 100,
  };

  try {
    const rgb = rgbFromCulori(
      culoriOklchToRgb({
        ...culoriOkhslToOklch(hsl),
        h,
        alpha: a,
      }),
    );
    
    return {
      r: Math.min(255, Math.max(0, rgb.r)),
      g: Math.min(255, Math.max(0, rgb.g)),
      b: Math.min(255, Math.max(0, rgb.b)),
      a: rgb.a
    };
  } catch (e) {
    console.warn('Color conversion failed:', e);
    return { r: 0, g: 0, b: 0, a };
  }
};

const rgbToSchemist = (color: RgbColor): SchemistColor => {
  const culoriRgb = rgbToCulori(color);
  const { h } = culoriRgbToOklch(culoriRgb);
  const { s, l } = culoriRgbToOkhsl(culoriRgb);

  return {
    h,
    s: s * 100,
    l: l * 100,
    a: color.a,
  };
};

export { rgbToSchemist, schemistToRgb };
