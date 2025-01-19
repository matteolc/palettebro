import { formatHex } from 'culori/fn';
import { clamp } from '../../utils/math';
import type { RgbColor } from '../types';
import { rgbToCulori } from '../culori';
import { round } from '../../utils/math';

const formatRgb = ({ r, g, b, a = 1 }: RgbColor, precision = 3) => {
  const rr = round(r, precision);
  const rg = round(g, precision);
  const rb = round(b, precision);
  const ra = round(clamp(a, 1), precision);
  return ra < 1
    ? `rgba(${rr}, ${rg}, ${rb}, ${ra})`
    : `rgb(${rr}, ${rg}, ${rb})`;
};

const formatRgbToHex = (color: RgbColor) => formatHex(rgbToCulori(color));

export { formatRgb, formatRgbToHex };
