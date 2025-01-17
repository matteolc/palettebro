import type { Config } from 'tailwindcss';
import { themes } from './app/themes';

const config: Pick<
  Config,
  'content' | 'theme' | 'variants' | 'plugins' | 'darkMode'
> = {
  darkMode: 'class',
  content: [
    './app/**/*.tsx',
    '../../packages/color-picker/**/*.{js,ts,jsx,tsx}',
    '../../packages/theme-toolbar/**/*.{js,ts,jsx,tsx}',
    '!../../packages/**/node_modules',
  ],
  variants: {
    extend: {
      first: ['first'],
      last: ['last'],
    },
  },
  plugins: [
    require('@palettebruh/tailwind-theme')({
      themes,
      utils: true,
      darkTheme: true,
    }),
  ],
};

export default config;
