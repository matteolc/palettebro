import pc from 'picocolors';
import plugin from 'tailwindcss/plugin';

import { version } from '../package.json';
import { getPaletteColors, SHADCN_COLOR_UTILITIES } from './theming/const';
import { injectThemes } from './theming/inject-themes';
import { utilities } from './utilities';
import type { PluginOptions } from './types';
import {
  type ColorShadesPreset,
  ColorShadesPresetEnum,
} from '@palettebro/theme-generator';

export const getColorUtilities = (colorShadesPreset: ColorShadesPreset) => ({
  ...getPaletteColors(colorShadesPreset),
  ...SHADCN_COLOR_UTILITIES,
});

export default plugin.withOptions(
  ({ utils, themes, darkTheme, addThemes }: PluginOptions) =>
    ({
      addBase,
      addUtilities,
    }: {
      // biome-ignore lint/suspicious/noExplicitAny: No will to type this
      addBase: (...args: any[]) => void;
      // biome-ignore lint/suspicious/noExplicitAny: No will to type this
      addUtilities: (...args: any[]) => void;
    }) => {
      console.info(
        '\n',
        `🏄   ${pc.magenta('@palettebro/tailwind-theme')} ${pc.dim(version)}`,
      );

      if (utils) {
        addUtilities(utilities);
        console.info(`├─ ${pc.green('✔︎')} ${'Utility classes added'}`, '\n');
      }

      if (addThemes) {
        injectThemes(addBase, { themes, darkTheme });
      }
    },
  ({ themes }: PluginOptions) => {
    const colorShadesPreset =
      themes.light.colorShadesPreset ?? ColorShadesPresetEnum.tailwind;

    if (Object.values(themes).some((theme) => theme.debug)) {
      console.info(getColorUtilities(colorShadesPreset));
    }
    return {
      theme: {
        extend: {
          colors: getColorUtilities(colorShadesPreset),
        },
      },
    };
  },
);
