import { rgbToCulori } from '../culori';
import { culoriRgbToOkhsl, culoriRgbToOklch } from '../culori';
import type { Okhsl } from 'culori';
import { rgbFromCulori } from '../culori';
import { culoriOklchToRgb } from '../culori';
import { culoriOkhslToOklch } from '../culori';
import type { RgbColor, SchemistColor } from '../types';

const schemistToRgb = ({ h, s, l, a }: SchemistColor): RgbColor => {
  const hsl: Okhsl = {
    mode: 'okhsl',
    h,
    s: s / 100,
    l: l / 100,
  };

  return rgbFromCulori(
    culoriOklchToRgb({
      ...culoriOkhslToOklch(hsl),
      h,
      alpha: a,
    })
  );
};

const rgbToSchemist = (color: RgbColor): SchemistColor => {
  const culoriRgb = rgbToCulori(color);
  const { h } = culoriRgbToOklch(culoriRgb);
  const { s, l } = culoriRgbToOkhsl(culoriRgb);

  return {
    h: h ?? 0,
    s: s * 100,
    l: l * 100,
    a: color.a,
  };
};

export { rgbToSchemist, schemistToRgb };
