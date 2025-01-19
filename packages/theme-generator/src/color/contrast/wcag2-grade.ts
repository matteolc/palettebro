import type { Wcag2Grade } from './types';
import { CONTRAST_GRADES } from './const';

export function wcag2Grade(contrastLevel: number): Wcag2Grade {
  for (const [threshold, grade] of Object.entries(CONTRAST_GRADES)) {
    if (contrastLevel >= Number(threshold)) {
      return grade;
    }
  }
  return 'KO';
}
