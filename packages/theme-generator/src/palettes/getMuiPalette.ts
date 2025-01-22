import {
  argbFromHex,
  hexFromArgb,
  type DynamicScheme,
  SchemeTonalSpot,
  Hct,
  SchemeFruitSalad,
  SchemeVibrant,
  SchemeRainbow,
  SchemeNeutral,
  SchemeMonochrome,
  SchemeFidelity,
  SchemeExpressive,
  SchemeContent,
  type TonalPalette,
} from '@material/material-color-utilities';
import {
  MuiThemePresetEnum,
  type Palette,
  type MuiThemePreset,
  type SchemistColor,
} from '../types';
import { formatSchemistToHex } from '../color/formatting';
import { nearestColorName } from '../color/nearest-color-name';
import tailwindScaleLight from '../presets/tailwindScaleLight';
import tailwindScaleDark from '../presets/tailwindScaleDark';
import {
  MATERIAL_TONES,
  parseColor,
  presetSamplesWithKeyAndName,
  presetSampleWithKeyAndNameHash,
} from '../index';
import states from '../presets/states';
import semanticPairs from '../presets/semanticPairs';
import rainbow from '../presets/rainbow';

// Create a type for the scheme constructor
type SchemeConstructor = new (
  hct: Hct,
  isDark: boolean,
  contrast: number,
) => DynamicScheme;

// Map preset keys to their scheme constructors
const schemeConstructors: Record<MuiThemePreset, SchemeConstructor> = {
  content: SchemeContent,
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  'fruit-salad': SchemeFruitSalad,
  monochrome: SchemeMonochrome,
  neutral: SchemeNeutral,
  rainbow: SchemeRainbow,
  'tonal-spot': SchemeTonalSpot,
  vibrant: SchemeVibrant,
};

// Create a single scheme
const createScheme = (
  Constructor: SchemeConstructor,
  props: { hct: Hct; isDark: boolean; contrast: number },
): DynamicScheme => {
  return new Constructor(props.hct, props.isDark, props.contrast);
};

// Create the preset map
const presetMap = (props: { hct: Hct; isDark: boolean; contrast: number }) => {
  return Object.entries(schemeConstructors).reduce(
    (schemes, [key, Constructor]) => {
      schemes[key as MuiThemePreset] = createScheme(Constructor, props);
      return schemes;
    },
    {} as Record<MuiThemePreset, DynamicScheme>,
  );
};

export const getMuiPalette = ({
  primaryColor,
  isDark,
  preset,
  contrast,
}: {
  primaryColor: SchemistColor;
  isDark: boolean;
  preset: MuiThemePreset;
  contrast: number;
}) => {
  const argb = argbFromHex(formatSchemistToHex(primaryColor));
  const hct = Hct.fromInt(argb);

  const presetKey =
    (MuiThemePresetEnum[preset] as MuiThemePreset) || 'fruit-salad';
  const scheme = presetMap({ hct, isDark, contrast })[presetKey];

  const tonesFromPalette = (palette: TonalPalette, token: string) => {
    return MATERIAL_TONES.reduce(
      (acc, tone) => {
        const color = palette.tone(tone);
        acc[`${token}-${tone}`] = {
          name: nearestColorName(hexFromArgb(color)),
          color: hexFromArgb(color),
        };
        return acc;
      },
      {} as Record<string, { name: string; color: string }>,
    );
  };

  const formatPalette = (presets: Palette, token: string) =>
    Object.entries(presets).reduce(
      (acc, [key, value]) => {
        const newKey = key.replace('$', token);
        acc[newKey] = value;
        return acc;
      },
      {} as Record<string, { name: string; color: string }>,
    );

  // Generate shades for primary, secondary, and accent colors
  const generateShades = (color: SchemistColor | undefined, token: string) => {
    if (!color) return {};
    const scaleNodes = isDark
      ? tailwindScaleDark.nodes
      : tailwindScaleLight.nodes;
    const presets = presetSampleWithKeyAndNameHash([
      ...presetSamplesWithKeyAndName(scaleNodes, color),
      ...presetSamplesWithKeyAndName(states.nodes, color),
    ]);

    return formatPalette(presets, token);
  };

  const generateSemanticPairs = (
    color: SchemistColor | undefined,
    token: string,
  ) => {
    if (!color) return {};
    const presets = presetSampleWithKeyAndNameHash([
      ...presetSamplesWithKeyAndName(semanticPairs.nodes, color),
    ]);

    return formatPalette(presets, token);
  };

  const generateChartColors = (
    color: SchemistColor | undefined,
    token: string,
  ) => {
    if (!color) return {};
    const presets = presetSampleWithKeyAndNameHash([
      ...presetSamplesWithKeyAndName(rainbow.nodes, color),
    ]);

    return formatPalette(presets, token);
  };

  // Transform into a hash map of color tokens
  return {
    primary: {
      name: nearestColorName(hexFromArgb(scheme.primary)),
      color: hexFromArgb(scheme.primary),
    },
    ...tonesFromPalette(scheme.primaryPalette, 'primary'),
    'inverse-primary': {
      name: nearestColorName(hexFromArgb(scheme.inversePrimary)),
      color: hexFromArgb(scheme.inversePrimary),
    },
    'on-primary': {
      name: nearestColorName(hexFromArgb(scheme.onPrimary)),
      color: hexFromArgb(scheme.onPrimary),
    },
    'primary-container': {
      name: nearestColorName(hexFromArgb(scheme.primaryContainer)),
      color: hexFromArgb(scheme.primaryContainer),
    },
    'on-primary-container': {
      name: nearestColorName(hexFromArgb(scheme.onPrimaryContainer)),
      color: hexFromArgb(scheme.onPrimaryContainer),
    },
    secondary: {
      name: nearestColorName(hexFromArgb(scheme.secondary)),
      color: hexFromArgb(scheme.secondary),
    },
    ...tonesFromPalette(scheme.secondaryPalette, 'secondary'),
    'on-secondary': {
      name: nearestColorName(hexFromArgb(scheme.onSecondary)),
      color: hexFromArgb(scheme.onSecondary),
    },
    'secondary-container': {
      name: nearestColorName(hexFromArgb(scheme.secondaryContainer)),
      color: hexFromArgb(scheme.secondaryContainer),
    },
    'on-secondary-container': {
      name: nearestColorName(hexFromArgb(scheme.onSecondaryContainer)),
      color: hexFromArgb(scheme.onSecondaryContainer),
    },
    tertiary: {
      name: nearestColorName(hexFromArgb(scheme.tertiary)),
      color: hexFromArgb(scheme.tertiary),
    },
    ...tonesFromPalette(scheme.tertiaryPalette, 'tertiary'),
    'on-tertiary': {
      name: nearestColorName(hexFromArgb(scheme.onTertiary)),
      color: hexFromArgb(scheme.onTertiary),
    },
    'tertiary-container': {
      name: nearestColorName(hexFromArgb(scheme.tertiaryContainer)),
      color: hexFromArgb(scheme.tertiaryContainer),
    },
    'on-tertiary-container': {
      name: nearestColorName(hexFromArgb(scheme.onTertiaryContainer)),
      color: hexFromArgb(scheme.onTertiaryContainer),
    },
    error: {
      name: nearestColorName(hexFromArgb(scheme.error)),
      color: hexFromArgb(scheme.error),
    },
    'on-error': {
      name: nearestColorName(hexFromArgb(scheme.onError)),
      color: hexFromArgb(scheme.onError),
    },
    'error-container': {
      name: nearestColorName(hexFromArgb(scheme.errorContainer)),
      color: hexFromArgb(scheme.errorContainer),
    },
    'on-error-container': {
      name: nearestColorName(hexFromArgb(scheme.onErrorContainer)),
      color: hexFromArgb(scheme.onErrorContainer),
    },
    background: {
      name: nearestColorName(hexFromArgb(scheme.background)),
      color: hexFromArgb(scheme.background),
    },
    'on-background': {
      name: nearestColorName(hexFromArgb(scheme.onBackground)),
      color: hexFromArgb(scheme.onBackground),
    },
    surface: {
      name: nearestColorName(hexFromArgb(scheme.surface)),
      color: hexFromArgb(scheme.surface),
    },
    'surface-dim': {
      name: nearestColorName(hexFromArgb(scheme.surfaceDim)),
      color: hexFromArgb(scheme.surfaceDim),
    },
    'surface-bright': {
      name: nearestColorName(hexFromArgb(scheme.surfaceBright)),
      color: hexFromArgb(scheme.surfaceBright),
    },
    'surface-container-lowest': {
      name: nearestColorName(hexFromArgb(scheme.surfaceContainerLowest)),
      color: hexFromArgb(scheme.surfaceContainerLowest),
    },
    'surface-container-low': {
      name: nearestColorName(hexFromArgb(scheme.surfaceContainerLow)),
      color: hexFromArgb(scheme.surfaceContainerLow),
    },
    'surface-container': {
      name: nearestColorName(hexFromArgb(scheme.surfaceContainer)),
      color: hexFromArgb(scheme.surfaceContainer),
    },
    'surface-container-high': {
      name: nearestColorName(hexFromArgb(scheme.surfaceContainerHigh)),
      color: hexFromArgb(scheme.surfaceContainerHigh),
    },
    'surface-container-highest': {
      name: nearestColorName(hexFromArgb(scheme.surfaceContainerHighest)),
      color: hexFromArgb(scheme.surfaceContainerHighest),
    },
    'on-surface': {
      name: nearestColorName(hexFromArgb(scheme.onSurface)),
      color: hexFromArgb(scheme.onSurface),
    },
    'surface-variant': {
      name: nearestColorName(hexFromArgb(scheme.surfaceVariant)),
      color: hexFromArgb(scheme.surfaceVariant),
    },
    'on-surface-variant': {
      name: nearestColorName(hexFromArgb(scheme.onSurfaceVariant)),
      color: hexFromArgb(scheme.onSurfaceVariant),
    },
    'inverse-surface': {
      name: nearestColorName(hexFromArgb(scheme.inverseSurface)),
      color: hexFromArgb(scheme.inverseSurface),
    },
    'inverse-on-surface': {
      name: nearestColorName(hexFromArgb(scheme.inverseOnSurface)),
      color: hexFromArgb(scheme.inverseOnSurface),
    },
    outline: {
      name: nearestColorName(hexFromArgb(scheme.outline)),
      color: hexFromArgb(scheme.outline),
    },
    'outline-variant': {
      name: nearestColorName(hexFromArgb(scheme.outlineVariant)),
      color: hexFromArgb(scheme.outlineVariant),
    },
    shadow: {
      name: nearestColorName(hexFromArgb(scheme.shadow)),
      color: hexFromArgb(scheme.shadow),
    },
    scrim: {
      name: nearestColorName(hexFromArgb(scheme.scrim)),
      color: hexFromArgb(scheme.scrim),
    },
    'surface-tint': {
      name: nearestColorName(hexFromArgb(scheme.surfaceTint)),
      color: hexFromArgb(scheme.surfaceTint),
    },
    // Custom colors
    accent: {
      name: nearestColorName(hexFromArgb(scheme.tertiary)),
      color: hexFromArgb(scheme.tertiary),
    },
    ...tonesFromPalette(scheme.tertiaryPalette, 'accent'),
    'on-accent': {
      name: nearestColorName(hexFromArgb(scheme.onTertiary)),
      color: hexFromArgb(scheme.onTertiary),
    },
    'accent-container': {
      name: nearestColorName(hexFromArgb(scheme.tertiaryContainer)),
      color: hexFromArgb(scheme.tertiaryContainer),
    },
    'on-accent-container': {
      name: nearestColorName(hexFromArgb(scheme.onTertiaryContainer)),
      color: hexFromArgb(scheme.onTertiaryContainer),
    },
    neutral: {
      name: nearestColorName(hexFromArgb(scheme.surfaceDim)),
      color: hexFromArgb(scheme.surfaceDim),
    },
    // ...generateShades(parseColor(hexFromArgb(scheme.primary))[1], 'primary'),
    // ...generateShades(
    //   parseColor(hexFromArgb(scheme.secondary))[1],
    //   'secondary',
    // ),
    // ...generateShades(parseColor(hexFromArgb(scheme.tertiary))[1], 'accent'),
    // TODO: Fix state colors
    ...generateShades(parseColor(hexFromArgb(scheme.error))[1], 'error'),
    ...generateShades(parseColor(hexFromArgb(scheme.error))[1], 'success'),
    ...generateShades(parseColor(hexFromArgb(scheme.error))[1], 'warning'),
    ...generateShades(parseColor(hexFromArgb(scheme.error))[1], 'info'),
    //...generateSemanticPairs(parseColor(hexFromArgb(scheme.primary))[1], ''),
    ...generateChartColors(
      parseColor(hexFromArgb(scheme.primary))[1],
      'primary',
    ),
  } as {
    [k: string]: {
      name: string;
      color: string;
    };
  };
};
