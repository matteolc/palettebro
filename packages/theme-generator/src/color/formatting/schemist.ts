import { formatRgbToHex } from './rgb';
import { schemistToHsl, schemistToLch, schemistToRgb } from '../conversion';
import type { SchemistColor } from '../types';
import { formatHsl } from './hsl';
import { formatLch } from './lch';
import { formatRgb } from './rgb';
import type { ColorFormat } from './types';

const formatSchemistToHex = (color: SchemistColor) =>
  formatRgbToHex(schemistToRgb(color));

const formatSchemist = (color: SchemistColor, precision = 3) =>
  color?.a !== undefined
    ? formatRgb(schemistToRgb(color), precision)
    : formatSchemistToHex(color);

const formatSchemistTo = (
  color: SchemistColor,
  format: ColorFormat,
  precision = 3,
) =>
  format === 'hex'
    ? formatSchemistToHex(color)
    : format === 'hsl'
      ? formatHsl(schemistToHsl(color), precision)
      : format === 'lch'
        ? formatLch(schemistToLch(color), precision)
        : formatRgb(schemistToRgb(color), precision);

export { formatSchemistToHex, formatSchemist, formatSchemistTo };
