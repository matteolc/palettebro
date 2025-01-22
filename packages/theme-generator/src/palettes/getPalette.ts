import picocolors from 'picocolors';
import { version } from '../../package.json';
import { formatSchemistToHex } from '../color/formatting';
import { nearestColorName } from '../color/nearest-color-name';
import { parseColor } from '../color/parse-color';
import {
  type MuiThemePreset,
  type Palette,
  type SchemistColor,
  type StaticThemePreset,
  type Theme,
  ThemeColorSchemeEnum,
} from '../types';
import { getMuiPalette } from './getMuiPalette';
import staticPalette from './static';
import dynamicPalette from './dynamic';

const logColor = (
  type: string,
  color: string | undefined,
  parsedColor: SchemistColor | undefined,
) => {
  if (!color) return;
  if (!parsedColor) return;

  const colorName = nearestColorName(formatSchemistToHex(parsedColor));
  console.log(
    ` ├─ ${picocolors.green('✔︎')} Generating theme for ${type} color: ${picocolors.dim(
      colorName,
    )} (${picocolors.dim(color)})`,
  );
  console.log(
    `%c${type} (input)\n${formatSchemistToHex(parsedColor)}`,
    `color: #000000; background-color: ${formatSchemistToHex(parsedColor)}; padding: 0.5rem;`,
  );
};

export const getPalette = (props: { theme: Theme }): Palette => {
  const {
    debug,
    reverse,
    preset,
    baseColors: { primary, secondary, accent },
    variant,
    'color-scheme': colorScheme,
    contrast,
  } = props.theme;

  if (debug) {
    console.log(
      '\n',
      `🏄   ${picocolors.magenta('@palettebro/theme-generator')} ${picocolors.dim(version)}`,
    );
  }

  const [_, primaryColor] = parseColor(primary);
  if (!primaryColor) return {};

  const secondaryColor =
    variant === 'dynamic' && secondary ? parseColor(secondary)[1] : undefined;
  const accentColor =
    variant === 'dynamic' && accent ? parseColor(accent)[1] : undefined;

  if (debug) {
    logColor('primary', primary, primaryColor);
    logColor('secondary', secondary, secondaryColor);
    logColor('accent', accent, accentColor);
  }

  const paletteProps = {
    primaryColor,
    secondaryColor,
    accentColor,
    reverse: reverse ?? false,
    isDark: colorScheme === ThemeColorSchemeEnum.dark,
    contrast: contrast ?? 0.0,
  };

  const palette =
    variant === 'mui'
      ? getMuiPalette({ ...paletteProps, preset: preset as MuiThemePreset })
      : variant === 'static'
        ? staticPalette({
            ...paletteProps,
            preset: preset as StaticThemePreset,
          })
        : dynamicPalette({
            ...paletteProps,
            preset: preset as StaticThemePreset,
          });
  if (debug) {
    console.dir(palette, { depth: null });
    for (const [key, value] of Object.entries(palette)) {
      console.log(
        `%c${picocolors.dim(key)}\n${value.name}`,
        `color: #000000; background-color: ${value.color}; padding: 0.5rem;`,
      );
    }
  }

  return palette;
};
