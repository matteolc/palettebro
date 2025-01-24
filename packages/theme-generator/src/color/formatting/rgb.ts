import { formatHex } from 'culori/fn';
import { clamp } from '../../utils/math';
import type { RgbColor } from '../types';
import { rgbToCulori } from '../culori';
import { round } from '../../utils/math';

const formatRgb = ({ r, g, b, a = 1 }: RgbColor, precision = 3) => {
  const rr = Math.round(25500 * r) / 100; // round(r, precision);
  const rg = Math.round(25500 * g) / 100; // round(g, precision);
  const rb = Math.round(25500 * b) / 100; // round(b, precision);
  const ra = round(clamp(a, 1), precision);
  return ra < 1
    ? `rgba(${rr}, ${rg}, ${rb}, ${ra})`
    : `rgb(${rr}, ${rg}, ${rb})`;
};

const formatRgbToHex = (color: RgbColor) => formatHex(rgbToCulori(color));

export { formatRgb, formatRgbToHex };
