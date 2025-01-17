import type { Config } from 'tailwindcss';

const config: Pick<
  Config,
  'content' | 'theme' | 'variants' | 'plugins' | 'darkMode'
> = {
  darkMode: 'class',
  content: [
    './app/**/*.tsx',
    // TODO: remove once built color picker
    '../../packages/**/*.{js,ts,jsx,tsx}',
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
      themes: true,
      utils: true,
      darkTheme: 'dark',
    }),
  ],
};

export default config;
