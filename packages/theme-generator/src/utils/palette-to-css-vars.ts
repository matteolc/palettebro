import type { Palette } from '../types';
import { colorToRawOklchString } from './oklch';

export const paletteToCssVars = (palette: Palette) => {
  const cssVars: Record<string, string> = {};
  for (const [key, value] of Object.entries(palette)) {
    Object.assign(cssVars, {
      [`--${key}`]: colorToRawOklchString(value.color),
    });
  }
  console.dir(cssVars, { depth: null });
  return cssVars;
};
