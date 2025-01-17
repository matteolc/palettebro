import picocolors from 'picocolors';
import { version } from '../../package.json';
import { formatSchemistToHex } from '../color/formatting';
import nearestColor from '../color/nearest';
import { parseColor } from '../color/parsing';
import {
  type Theme,
  ThemeColorSchemeEnum,
  ThemeVariantToPalette,
} from '../types';

export const getPalette = (props: { theme: Theme }) => {
  const {
    debug,
    reverse,
    preset,
    baseColors: { primary, secondary, accent },
  } = props.theme;

  if (debug) {
    console.log(
      '\n',
      `🏄   ${picocolors.magenta('@repo/theme-generator')} ${picocolors.dim(
        version,
      )}`,
    );
  }

  const [_, primaryColor] = parseColor(primary);
  if (!primaryColor) {
    return {};
  }
  const primaryColorName = nearestColor(formatSchemistToHex(primaryColor));

  if (debug) {
    console.log(
      ` ├─ ${picocolors.green(
        '✔︎',
      )} Generating theme for primary color: ${picocolors.dim(
        primaryColorName,
      )} (${picocolors.dim(primary)})`,
    );
    console.log(
      `%cPrimary (input)\n${formatSchemistToHex(primaryColor)}`,
      `color: #000000; background-color: ${formatSchemistToHex(primaryColor)}; padding: 0.5rem;`,
    );
  }

  let secondaryColor: ReturnType<typeof parseColor>[1];

  if (secondary && props.theme.variant === 'dynamic') {
    const parsed = parseColor(secondary);
    if (parsed[1]) {
      secondaryColor = parsed[1];
      const secondaryColorName = nearestColor(
        formatSchemistToHex(secondaryColor),
      );
      if (debug) {
        console.log(
          ` ├─ ${picocolors.green(
            '✔︎',
          )} Generating theme for secondary color: ${picocolors.dim(
            secondaryColorName,
          )} (${picocolors.dim(secondary)})`,
        );
        console.log(
          `%cSecondary (input)\n${formatSchemistToHex(secondaryColor)}`,
          `color: #000000; background-color: ${formatSchemistToHex(secondaryColor)}; padding: 0.5rem;`,
        );
      }
    }
  }

  let accentColor: ReturnType<typeof parseColor>[1];

  if (accent && props.theme.variant === 'dynamic') {
    const parsed = parseColor(accent);
    if (parsed[1]) {
      accentColor = parsed[1];
      const accentColorName = nearestColor(formatSchemistToHex(accentColor));
      if (debug) {
        console.log(
          ` ├─ ${picocolors.green(
            '✔︎',
          )} Generating theme for accent color: ${picocolors.dim(
            accentColorName,
          )} (${picocolors.dim(accent)})`,
        );
        console.log(
          `%cAccent (input)\n${formatSchemistToHex(accentColor)}`,
          `color: #000000; background-color: ${formatSchemistToHex(accentColor)}; padding: 0.5rem;`,
        );
      }
    }
  }

  const palette = ThemeVariantToPalette[props.theme.variant]({
    primaryColor,
    secondaryColor,
    accentColor,
    reverse: reverse ?? false,
    preset: preset ?? 'split-complementary',
    isDark: props.theme['color-scheme'] === ThemeColorSchemeEnum.dark,
  });
  if (debug) {
    for (const [key, value] of Object.entries(palette)) {
      console.log(
        `%c${picocolors.dim(key)}\n${value.name}`,
        `color: #000000; background-color: ${value.color}; padding: 0.5rem;`,
      );
    }
  }

  return palette;
};
