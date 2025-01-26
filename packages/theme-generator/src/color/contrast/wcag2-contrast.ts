import { wcagContrast } from 'culori';
import { schemistToRgb } from '../conversion';
import { rgbToCulori } from '../culori';
import { parseColor } from '../parse-color';

export const wcag2Contrast = (bg: string, fg: string) => {
  const [_, bgColor] = parseColor(bg);
  const [__, fgColor] = parseColor(fg);

  if (!bgColor || !fgColor) return undefined;

  return wcagContrast(
    rgbToCulori(schemistToRgb(bgColor)),
    rgbToCulori(schemistToRgb(fgColor)),
  );
};
