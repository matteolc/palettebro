import { sRGBtoY } from 'apca-w3';

import { APCAcontrast } from 'apca-w3';
import { schemistToRgb } from '../conversion';
import { parseColor } from '../parse-color';

export const wcag3Contrast = (bg: string, fg: string) => {
  const [_, bgColor] = parseColor(bg);
  const [__, fgColor] = parseColor(fg);

  if (!bgColor || !fgColor) return 0;

  const { r: bgR, g: bgG, b: bgB } = schemistToRgb(bgColor);
  const { r: fgR, g: fgG, b: fgB } = schemistToRgb(fgColor);

  // APCA expects RGB values between 0-1, but schemistToRgb returns 0-255
  return Math.abs(
    APCAcontrast(
      sRGBtoY([fgR/255, fgG/255, fgB/255]), 
      sRGBtoY([bgR/255, bgG/255, bgB/255])
    ) as number,
  );
};
