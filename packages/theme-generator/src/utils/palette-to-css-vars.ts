import type { Palette } from '../types';
import { colorToRawOklchString } from './oklch';

export const paletteToCssVars = (palette: Palette) => {
  const cssVars: Record<string, string> = {};
  for (const [key, value] of Object.entries(palette)) {
    Object.assign(cssVars, {
      [`--${key}`]: colorToRawOklchString(value.color),
    });
  }

  cssVars['--foreground'] = cssVars['--on-surface'];
  cssVars['--card'] = cssVars['--surface-container-low'];
  cssVars['--card-foreground'] = cssVars['--on-surface'];
  cssVars['--popover'] = cssVars['--surface-container-lowest'];
  cssVars['--popover-foreground'] = cssVars['--on-surface'];
  cssVars['--muted'] = cssVars['--surface'];
  cssVars['--muted-foreground'] = cssVars['--on-surface'];
  cssVars['--destructive'] = cssVars['--error'];
  cssVars['--destructive-foreground'] = cssVars['--on-error'];
  cssVars['--border'] = cssVars['--surface-container-high'];
  cssVars['--input'] = cssVars['--outline'];
  cssVars['--ring'] = cssVars['--outline-variant'];
  cssVars['--chart-1'] = cssVars['--primary-rainbow-0'];
  cssVars['--chart-2'] = cssVars['--primary-rainbow-1'];
  cssVars['--chart-3'] = cssVars['--primary-rainbow-2'];
  cssVars['--chart-4'] = cssVars['--primary-rainbow-3'];
  cssVars['--chart-5'] = cssVars['--primary-rainbow-4'];
  cssVars['--chart-6'] = cssVars['--primary-rainbow-5'];
  cssVars['--chart-7'] = cssVars['--primary-rainbow-6'];
  cssVars['--chart-8'] = cssVars['--primary-rainbow-7'];
  cssVars['--chart-9'] = cssVars['--primary-rainbow-8'];
  cssVars['--chart-10'] = cssVars['--primary-rainbow-9'];
  cssVars['--chart-11'] = cssVars['--primary-rainbow-10'];

  cssVars['--sidebar'] = cssVars['--surface-container'];
  cssVars['--sidebar-foreground'] = cssVars['--on-surface'];
  cssVars['--sidebar-primary'] = cssVars['--primary'];
  cssVars['--sidebar-primary-foreground'] = cssVars['--on-primary'];
  cssVars['--sidebar-accent'] = cssVars['--accent'];
  cssVars['--sidebar-accent-foreground'] = cssVars['--on-accent'];
  cssVars['--sidebar-border'] = cssVars['--surface-container-high'];
  cssVars['--sidebar-ring'] = cssVars['--outline-variant'];

  cssVars['--border'] = cssVars['--surface-container-high'];
  cssVars['--input'] = cssVars['--outline'];
  cssVars['--ring'] = cssVars['--outline-variant'];

  return cssVars;
};
