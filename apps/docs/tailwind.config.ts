import type { Config } from 'tailwindcss';
import { themes } from './app/themes';

const config: Pick<
  Config,
  'content' | 'theme' | 'variants' | 'plugins' | 'darkMode'
> = {
  darkMode: 'class',
  content: [
    './app/**/*.tsx',
    '../../packages/color-picker/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/theme-toolbar/src/**/*.{js,ts,jsx,tsx}',
    '!../../packages/**/node_modules',
  ],
  variants: {
    extend: {
      first: ['first'],
      last: ['last'],
    },
  },
  plugins: [
    require('@palettebro/tailwind-theme')({
      themes,
      utils: true,
      addThemes: false,
    }),
  ],
};

export default config;
