import pc from 'picocolors';
import plugin from 'tailwindcss/plugin';

import { version } from '../package.json';
import { PALETTE_COLORS, SHADCN_COLOR_UTILITIES } from './theming/const';
import { injectThemes } from './theming/inject-themes';
import { utilities } from './utilities';
import type { PluginOptions } from './types';

export default plugin.withOptions(
  ({ utils, themes, darkTheme }: PluginOptions) =>
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
        `🏄   ${pc.magenta('@palettebro/tailwind-theme')} ${pc.dim(version)}`,
      );

      if (utils) {
        addUtilities(utilities);
        console.log(`├─ ${pc.green('✔︎')} ${'Utility classes added'}`, '\n');
      }

      injectThemes(addBase, { themes, darkTheme });
    },
  () => ({
    theme: {
      extend: {
        colors: {
          ...PALETTE_COLORS,
          ...SHADCN_COLOR_UTILITIES,
        },
      },
    },
  }),
);
