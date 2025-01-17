import pc from 'picocolors';
import plugin from 'tailwindcss/plugin';

import { version } from '../package.json';
import { PALETTE_COLORS, SHADCN_COLOR_UTILITIES } from './theming/const';
import { injectThemes } from './theming/inject-themes';
import { utilities } from './utilities';
import type { Themes } from '@palettebruh/theme-generator/types';

type PluginOptions = {
  themes: Themes;
  utils: boolean;
  darkTheme: string | boolean;
};

export default plugin.withOptions(
  (options: PluginOptions) =>
    ({
      addBase,
      addUtilities,
    }: {
      // biome-ignore lint/suspicious/noExplicitAny: No will to type this
      addBase: (...args: any[]) => void;
      // biome-ignore lint/suspicious/noExplicitAny: No will to type this
      addUtilities: (...args: any[]) => void;
    }) => {
      console.log(
        '\n',
        `🏄   ${pc.magenta('@palettebruh/tailwind-theme')} ${pc.dim(version)}`,
      );

      if (options.utils) {
        addUtilities(utilities);
        console.log(`├─ ${pc.green('✔︎')} ${'Utility classes added'}`, '\n');
      }

      if (options.themes) {
        injectThemes(addBase, options);
        console.log(`├─ ${pc.green('✔︎')} ${'Theme classes added'}`, '\n');
      }
      else {
        console.log(`├─ ${pc.red('✘')} ${'No themes added'}`, '\n');
      }
    },
  () => ({
    theme: {
      extend: {
        colors: {
          ...SHADCN_COLOR_UTILITIES,
          ...PALETTE_COLORS,
        },
      },
    },
  }),
);

export type { PluginOptions };
