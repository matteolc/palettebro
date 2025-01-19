import { schemistToRgb } from '../conversion';
import { parseColor } from '../parse-color';

export const isDark = (color: string) => {
  const [_, parsedColor] = parseColor(color);
  if (!parsedColor) return false;

  const { r, g, b } = schemistToRgb(parsedColor);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
};
