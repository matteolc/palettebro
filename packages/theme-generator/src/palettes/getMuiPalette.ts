import {
  argbFromHex,
  themeFromSourceColor,
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
  SchemeAndroid,
} from '@material/material-color-utilities';
import {
  MuiThemePresetEnum,
  type MuiThemePreset,
  type SchemistColor,
} from '../types';
import { formatSchemistToHex } from '../color/formatting';
import nearestColor from '../color/nearest';
import scale from '../presets/scale';
import tailwindScaleLight from '../presets/tailwindScaleLight';
import tailwindScaleDark from '../presets/tailwindScaleDark';
import {
  parseColor,
  presetSamplesWithKeyAndName,
  presetSampleWithKeyAndNameHash,
} from '../index';
import states from '../presets/states';

type PresetKey =
  | 'content'
  | 'expressive'
  | 'fidelity'
  | 'fruit-salad'
  | 'monochrome'
  | 'neutral'
  | 'rainbow'
  | 'tonal-spot'
  | 'vibrant';

// Create a type for the scheme constructor
type SchemeConstructor = new (
  hct: Hct,
  isDark: boolean,
  contrast: number,
) => DynamicScheme;

// Map preset keys to their scheme constructors
const schemeConstructors: Record<PresetKey, SchemeConstructor> = {
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
      schemes[key as PresetKey] = createScheme(Constructor, props);
      return schemes;
    },
    {} as Record<PresetKey, DynamicScheme>,
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

  const presetKey = (MuiThemePresetEnum[preset] as PresetKey) || 'fruit-salad';
  const scheme = presetMap({ hct, isDark, contrast })[presetKey];

  // Generate shades for primary, secondary, and accent colors
  const generateShades = (color: SchemistColor | undefined, token: string) => {
    if (!color) return {};
    const scaleNodes = isDark ? tailwindScaleDark.nodes : tailwindScaleLight.nodes;
    const presets = presetSampleWithKeyAndNameHash([
      ...presetSamplesWithKeyAndName(scaleNodes, color),
      ...presetSamplesWithKeyAndName(states.nodes, color),
    ]);

    return Object.entries(presets).reduce(
      (acc, [key, value]) => {
        const newKey = key.replace('$', token);
        acc[newKey] = value;
        return acc;
      },
      {} as Record<string, { name: string; color: string }>,
    );
  };

  // Transform into a hash map of color tokens
  return {
    primary: {
      name: nearestColor(hexFromArgb(scheme.primary)),
      color: hexFromArgb(scheme.primary),
    },
    'on-primary': {
      name: nearestColor(hexFromArgb(scheme.onPrimary)),
      color: hexFromArgb(scheme.onPrimary),
    },
    'primary-container': {
      name: nearestColor(hexFromArgb(scheme.primaryContainer)),
      color: hexFromArgb(scheme.primaryContainer),
    },
    'on-primary-container': {
      name: nearestColor(hexFromArgb(scheme.onPrimaryContainer)),
      color: hexFromArgb(scheme.onPrimaryContainer),
    },
    secondary: {
      name: nearestColor(hexFromArgb(scheme.secondary)),
      color: hexFromArgb(scheme.secondary),
    },
    'on-secondary': {
      name: nearestColor(hexFromArgb(scheme.onSecondary)),
      color: hexFromArgb(scheme.onSecondary),
    },
    'secondary-container': {
      name: nearestColor(hexFromArgb(scheme.secondaryContainer)),
      color: hexFromArgb(scheme.secondaryContainer),
    },
    'on-secondary-container': {
      name: nearestColor(hexFromArgb(scheme.onSecondaryContainer)),
      color: hexFromArgb(scheme.onSecondaryContainer),
    },
    accent: {
      name: nearestColor(hexFromArgb(scheme.tertiary)),
      color: hexFromArgb(scheme.tertiary),
    },
    'on-accent': {
      name: nearestColor(hexFromArgb(scheme.onTertiary)),
      color: hexFromArgb(scheme.onTertiary),
    },
    'accent-container': {
      name: nearestColor(hexFromArgb(scheme.tertiaryContainer)),
      color: hexFromArgb(scheme.tertiaryContainer),
    },
    'on-accent-container': {
      name: nearestColor(hexFromArgb(scheme.onTertiaryContainer)),
      color: hexFromArgb(scheme.onTertiaryContainer),
    },
    tertiary: {
      name: nearestColor(hexFromArgb(scheme.tertiary)),
      color: hexFromArgb(scheme.tertiary),
    },
    'on-tertiary': {
      name: nearestColor(hexFromArgb(scheme.onTertiary)),
      color: hexFromArgb(scheme.onTertiary),
    },
    'tertiary-container': {
      name: nearestColor(hexFromArgb(scheme.tertiaryContainer)),
      color: hexFromArgb(scheme.tertiaryContainer),
    },
    'on-tertiary-container': {
      name: nearestColor(hexFromArgb(scheme.onTertiaryContainer)),
      color: hexFromArgb(scheme.onTertiaryContainer),
    },
    error: {
      name: nearestColor(hexFromArgb(scheme.error)),
      color: hexFromArgb(scheme.error),
    },
    'on-error': {
      name: nearestColor(hexFromArgb(scheme.onError)),
      color: hexFromArgb(scheme.onError),
    },
    'error-container': {
      name: nearestColor(hexFromArgb(scheme.errorContainer)),
      color: hexFromArgb(scheme.errorContainer),
    },
    'on-error-container': {
      name: nearestColor(hexFromArgb(scheme.onErrorContainer)),
      color: hexFromArgb(scheme.onErrorContainer),
    },
    background: {
      name: nearestColor(hexFromArgb(scheme.background)),
      color: hexFromArgb(scheme.background),
    },
    'on-background': {
      name: nearestColor(hexFromArgb(scheme.onBackground)),
      color: hexFromArgb(scheme.onBackground),
    },
    surface: {
      name: nearestColor(hexFromArgb(scheme.surface)),
      color: hexFromArgb(scheme.surface),
    },
    'on-surface': {
      name: nearestColor(hexFromArgb(scheme.onSurface)),
      color: hexFromArgb(scheme.onSurface),
    },
    'surface-variant': {
      name: nearestColor(hexFromArgb(scheme.surfaceVariant)),
      color: hexFromArgb(scheme.surfaceVariant),
    },
    'on-surface-variant': {
      name: nearestColor(hexFromArgb(scheme.onSurfaceVariant)),
      color: hexFromArgb(scheme.onSurfaceVariant),
    },
    neutral: {
      name: nearestColor(hexFromArgb(scheme.surface)),
      color: hexFromArgb(scheme.surface),
    },
    outline: {
      name: nearestColor(hexFromArgb(scheme.outline)),
      color: hexFromArgb(scheme.outline),
    },
    'outline-variant': {
      name: nearestColor(hexFromArgb(scheme.outlineVariant)),
      color: hexFromArgb(scheme.outlineVariant),
    },
    ...generateShades(parseColor(hexFromArgb(scheme.primary))[1], 'primary'),
    ...generateShades(
      parseColor(hexFromArgb(scheme.secondary))[1],
      'secondary',
    ),
    ...generateShades(parseColor(hexFromArgb(scheme.tertiary))[1], 'accent'),
    ...generateShades(parseColor(hexFromArgb(scheme.surface))[1], 'neutral'),
    ...generateShades(parseColor(hexFromArgb(scheme.error))[1], 'error'),
    ...generateShades(parseColor(hexFromArgb(scheme.error))[1], 'success'),
    ...generateShades(parseColor(hexFromArgb(scheme.error))[1], 'warning'),
    ...generateShades(parseColor(hexFromArgb(scheme.error))[1], 'info'),
  } as {
    [k: string]: {
      name: string;
      color: string;
    };
  };
};
