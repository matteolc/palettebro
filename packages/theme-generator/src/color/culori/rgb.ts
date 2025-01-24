import {
  type Rgb,
  convertLabToLch,
  convertOklabToOkhsl,
  convertRgbToLab,
  convertRgbToOklab,
} from 'culori/fn';
import type { RgbColor } from '../types';

const rgbFromCulori = ({ r, g, b, alpha }: Rgb): RgbColor => ({
  r: Math.round(25500 * r) / 100,
  g: Math.round(25500 * g) / 100,
  b: Math.round(25500 * b) / 100,
  a: alpha,
});

const rgbToCulori = ({ r, g, b, a }: RgbColor): Rgb => ({
  mode: 'rgb',
  r: Math.round(100 * r) / 25500,
  g: Math.round(100 * g) / 25500,
  b: Math.round(100 * b) / 25500,
  alpha: a,
});

const culoriRgbToLch = (color: Rgb) =>
  convertLabToLch(convertRgbToLab(color));

const culoriRgbToOkhsl = (color: Rgb) =>
  convertOklabToOkhsl(convertRgbToOklab(color));

const culoriRgbToOklch = (color: Rgb) =>
  convertLabToLch(convertRgbToOklab(color), 'oklch');

export {
  rgbFromCulori,
  rgbToCulori,
  culoriRgbToLch,
  culoriRgbToOkhsl,
  culoriRgbToOklch,
};
