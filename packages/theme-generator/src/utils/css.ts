import { formatSchemist } from '../color/formatting';
import type { SchemistColor } from '../color/types';

export const continuousGradient = (colors: SchemistColor[]) => {
  const l = 100 / colors.length;
  const stops = colors
    .map((color, i) => `${formatSchemist(color)} ${i * l}%`)
    .join(', ');

  return `linear-gradient(90deg, ${stops})`;
};

export const discreteGradient = (colors: SchemistColor[]) => {
  const l = 100 / colors.length;
  const stops = colors
    .map((color, i) => `${formatSchemist(color)} ${i * l}% ${(i + 1) * l}%`)
    .join(', ');

  return `linear-gradient(90deg, ${stops})`;
};

export const joinProperties = (props: Record<string, string>) =>
  Object.entries(props)
    .map(([name, value]) => `${name}: ${value}`)
    .join('; ');

export const cssRule = (name: string, value: string) => `--${name}: ${value};`;

export const sassRule = (name: string, value: string) => `$${name}: ${value};`;

export const styleTag = (tagName: string, rules: string) =>
  `<style>${tagName} {${rules}}</style>`;
