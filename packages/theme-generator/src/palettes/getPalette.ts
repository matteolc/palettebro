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
  type ThemePalette,
  ThemeVariantEnum,
  ThemeVariantToPalette,
} from '../types';
import { getMuiPalette } from './getMuiPalette';
import { getStaticPalette } from './getStaticPalette';
import { getDynamicPalette } from './getDynamicPalette';

const logColor = (
  type: string,
  color: string | undefined,
  parsedColor: SchemistColor | undefined,
) => {
  if (!color) return;
  if (!parsedColor) return;

  const hexColor = formatSchemistToHex(parsedColor);
  const colorName = nearestColorName(hexColor);
  console.info(
    ` ├─ ${picocolors.green('✔︎')} Generating theme for ${type} color ${color}: ${picocolors.dim(
      colorName,
    )} (${picocolors.dim(hexColor)})`,
  );
  console.info(
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
    reverseLightDarkShades,
    colorShadesPreset,
  } = props.theme;

  if (debug) {
    console.info(
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

  logColor('primary', primary, primaryColor);
  logColor('secondary', secondary, secondaryColor);
  logColor('accent', accent, accentColor);

  const paletteProps = {
    primaryColor,
    secondaryColor,
    accentColor,
    reverse: reverse ?? false,
    isDark: colorScheme === ThemeColorSchemeEnum.dark,
    contrast: contrast ?? 0.0,
    reverseLightDarkShades,
    preset,
    colorShadesPreset,
  } satisfies ThemePalette;

  const palette = ThemeVariantToPalette[variant](paletteProps);

  if (debug) {
    for (const [key, value] of Object.entries(palette)) {
      console.info(
        `%c${picocolors.dim(key)}\n${value.name}`,
        `color: #000000; background-color: ${value.color}; padding: 0.5rem;`,
      );
    }
  }

  return palette;
};
