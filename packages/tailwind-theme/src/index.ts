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

// @ts-ignore
const tailwindPlugin = plugin.withOptions<PluginOptions>(
  (options?: PluginOptions) => {
    const defaultOptions: PluginOptions = {
      themes: {
        light: {
          'color-scheme': 'light',
          variant: 'static',
          baseColors: {
            primary: '#000000'
          }
        },
        dark: {
          'color-scheme': 'dark',
          variant: 'static',
          baseColors: {
            primary: '#ffffff'
          }
        }
      },
      utils: false,
      darkTheme: false,
      addThemes: false,
    };
    const finalOptions = { ...defaultOptions, ...options };

    return ({ addBase, addUtilities }) => {
      console.info(
        '\n',
        `🏄   ${pc.magenta('@palettebro/tailwind-theme')} ${pc.dim(version)}`,
      );

      if (finalOptions.utils) {
        addUtilities(utilities);
        console.info(`├─ ${pc.green('✔︎')} ${'Utility classes added'}`, '\n');
      }

      if (finalOptions.addThemes) {
        injectThemes(addBase, { 
          themes: finalOptions.themes, 
          darkTheme: finalOptions.darkTheme 
        });
      }
    };
  },
  (options?: PluginOptions) => {
    const defaultOptions: PluginOptions = {
      themes: {
        light: {
          'color-scheme': 'light',
          variant: 'static',
          baseColors: {
            primary: '#000000'
          }
        },
        dark: {
          'color-scheme': 'dark',
          variant: 'static',
          baseColors: {
            primary: '#ffffff'
          }
        }
      },
      utils: false,
      darkTheme: false,
      addThemes: false,
    };
    const finalOptions = { ...defaultOptions, ...options };
    const colorShadesPreset =
      finalOptions.themes.light.colorShadesPreset ?? ColorShadesPresetEnum.tailwind;

    if (Object.values(finalOptions.themes).some((theme) => theme.debug)) {
      console.info(getColorUtilities(colorShadesPreset));
    }
    return {
      theme: {
        extend: {
          colors: getColorUtilities(colorShadesPreset),
        },
      },
    };
  }
);

export default tailwindPlugin;
