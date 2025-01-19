import {
  type Culori,
  convertLabToLch,
  convertOklabToOkhsl,
  convertRgbToLab,
  convertRgbToOklab,
} from 'culori/fn';
import type { RgbColor } from '../types';
import { modeLrgb } from './modes';

const rgbFromCulori = ({ r, g, b, alpha }: Culori.Rgb): RgbColor => ({
  r: r * 255,
  g: g * 255,
  b: b * 255,
  a: alpha,
});

const rgbToCulori = ({ r, g, b, a }: RgbColor): Culori.Rgb => ({
  mode: 'rgb',
  r: r / 255,
  g: g / 255,
  b: b / 255,
  alpha: a,
});

const culoriRgbToLch = (color: Culori.Rgb) =>
  convertLabToLch(convertRgbToLab(color));

const culoriRgbToOkhsl = (color: Culori.Rgb) =>
  convertOklabToOkhsl(convertRgbToOklab(color));

const culoriRgbToOklch = (color: Culori.Rgb) =>
  convertLabToLch(convertRgbToOklab(color), 'oklch');

export {
  rgbFromCulori,
  rgbToCulori,
  culoriRgbToLch,
  culoriRgbToOkhsl,
  culoriRgbToOklch,
};
