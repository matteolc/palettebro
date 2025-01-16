import pc from 'picocolors';
import plugin from 'tailwindcss/plugin';

import { version } from '../package.json';
import { injectThemes } from './theming/inject-themes';
import { themes } from './themes';
import { utilities } from './utilities';
import { PALETTE_COLORS, SHADCN_COLOR_UTILITIES } from './theming/const';

type PluginOptions = {
  themes: boolean | string[];
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
        `🏄   ${pc.magenta('@repo/tailwind-theme')} ${pc.dim(version)}`,
      );

      if (options.utils) {
        addUtilities(utilities);
        console.log(`├─ ${pc.green('✔︎')} ${'Utility classes added'}`, '\n');
      }

      if (options.themes) {
        injectThemes(addBase, options, themes);
        console.log(`├─ ${pc.green('✔︎')} ${'Theme classes added'}`, '\n');
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

export { themes as defaultThemes };
export type { PluginOptions };
