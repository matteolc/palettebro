import pc from 'picocolors';
import plugin from 'tailwindcss/plugin';

import { version } from '../package.json';
import { themes } from './themes';
import { PALETTE_COLORS, SHADCN_COLOR_UTILITIES } from './theming/const';
import { injectThemes } from './theming/inject-themes';
import { utilities } from './utilities';

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
        `🏄   ${pc.magenta('@palettebruh/tailwind-theme')} ${pc.dim(version)}`,
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
