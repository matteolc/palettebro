import type { SchemistColor } from '../types';

export const randomUsableColor = (): SchemistColor => ({
  h: Math.round(Math.random() * 360),
  s: 50 + Math.random() * 50,
  l: 30 + Math.random() * 60,
});
