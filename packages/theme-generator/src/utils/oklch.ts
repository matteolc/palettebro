import type { Oklch } from 'culori';
import { oklch } from 'culori';
import { cutNumber } from './cut-number';

const oklchColorToString = ({ l, c, h }: Oklch) =>
  `${Number.parseFloat((cutNumber(l) * 100).toFixed(6))}% ${cutNumber(
    c,
  )} ${cutNumber(h ?? 0)}`;

const colorToRawOklchString = (color: string) => {
  const result = oklch(color);
  return result ? oklchColorToString(result) : '0% 0 0';
};

export { oklchColorToString, colorToRawOklchString };
