import type { Config } from 'tailwindcss';

const config: Pick<Config, 'presets' | 'content' | 'prefix'> = {
  content: ['./src/**/*.tsx'],
  presets: [require('@repo/tailwind-config')],
};

export default config;
