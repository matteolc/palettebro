import picocolors from 'picocolors';
import { version } from '../../package.json';
import { formatSchemistToHex } from '../color/formatting';
import { nearestColorName } from '../color/nearest-color-name';
import { parseColor } from '../color/parse-color';
import {
  type Palette,
  type SchemistColor,
  type Theme,
  ThemeColorSchemeEnum,
  type ThemePalette,
  ThemeVariantToPalette,
} from '../types';

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

  const secondaryColor = secondary ? parseColor(secondary)[1] : undefined;
  const accentColor = accent ? parseColor(accent)[1] : undefined;

  logColor('primary', primary, primaryColor);
  logColor('secondary', secondary, secondaryColor);
  logColor('accent', accent, accentColor);

  const palette = ThemeVariantToPalette[variant]({
    primaryColor,
    secondaryColor,
    accentColor,
    reverse: reverse ?? false,
    isDark: colorScheme === ThemeColorSchemeEnum.dark,
    contrast: contrast ?? 0.0,
    reverseLightDarkShades,
    preset,
    colorShadesPreset,
  } satisfies ThemePalette);

  if (debug) {
    console.info(palette);
    for (const [key, value] of Object.entries(palette)) {
      console.info(
        `%c${picocolors.dim(key)}\n${value.name}`,
        `color: #000000; background-color: ${value.color}; padding: 0.5rem;`,
      );
    }
  }

  return palette;
};
