import { parse, parseHex, type Rgb } from 'culori/fn';
import { hslToSchemist, lchToSchemist, rgbToSchemist } from './conversion';
import { hslFromCulori, lchFromCulori, rgbFromCulori } from './culori';
import type { SchemistColor } from './types';

export const parseColor = (
  color: string,
): [string, SchemistColor | undefined] => {
  try {
    // Add input validation
    if (!color || typeof color !== 'string') {
      throw new Error('Invalid color input');
    }

    const hex = parseHex(color);

    if (hex) {
      return ['hex', rgbToSchemist(rgbFromCulori(hex as Rgb))];
    }

    const parsed = parse(color);

    switch (parsed?.mode) {
      case 'rgb':
        return ['rgb', rgbToSchemist(rgbFromCulori(parsed))];
      case 'hsl':
        return ['hsl', hslToSchemist(hslFromCulori(parsed))];
      case 'lch':
        return ['lch', lchToSchemist(lchFromCulori(parsed))];
      default:
        return [color, undefined];
    }
  } catch (error) {
    console.warn(`Color parsing failed for "${color}":`, error);
    return [color, undefined];
  }
};
