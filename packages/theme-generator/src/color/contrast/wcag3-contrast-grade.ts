import { wcag3Grade } from './wcag3-grade';
import { wcag3Contrast } from './wcag3-contrast';

export const wcag3ContrastGrade = (bg: string, fg: string) => {
  const contrast = wcag3Contrast(bg, fg);
  return wcag3Grade(contrast);
};
