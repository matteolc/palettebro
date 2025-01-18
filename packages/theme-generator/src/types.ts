import dynamicPalette from './palettes/dynamic';
import muiPalette from './palettes/mui';
import staticPalette from './palettes/static';
import { getMuiPalette } from './palettes/getMuiPalette';
import { createEnum } from './utils/create-enum';

export type ThemeColorScheme = 'light' | 'dark';
export type ThemeVariant = 'mui' | 'static' | 'dynamic';

export const ThemeColorSchemeEnum = createEnum(['light', 'dark'] as const);
export const ThemeVariantEnum = createEnum([
  'mui',
  'static',
  'dynamic',
] as const);

export const ThemeVariantToPalette = {
  mui: getMuiPalette,
  static: staticPalette,
  dynamic: dynamicPalette,
};

export type StaticThemePreset = 'split-complementary' | 'tetrad' | 'triad';

export type MuiThemePreset =
  | 'content'
  | 'expressive'
  | 'fidelity'
  | 'fruit-salad'
  | 'monochrome'
  | 'neutral'
  | 'rainbow'
  | 'tonal-spot'
  | 'vibrant';

export const StaticThemePresetEnum = createEnum([
  'split-complementary',
  'tetrad',
  'triad',
] as const);

export const MuiThemePresetEnum = createEnum([
  'content',
  'expressive',
  'fidelity',
  'fruit-salad',
  'monochrome',
  'neutral',
  'rainbow',
  'tonal-spot',
  'vibrant',
] as const);

export type GenerativeThemeMode = 'transformer' | 'diffusion' | 'creative';
export const GenerativeThemeModeEnum = createEnum([
  'transformer',
  'diffusion',
  'creative',
] as const);

export type GenerativeThemePage = 'website-magazine' | 'brand-2' | 'brand-3' | 'website-1';
export const GenerativeThemePageEnum = createEnum([
  'website-magazine',
  'brand-2',
  'brand-3',
  'website-1',
] as const);

export type GenerativeThemePreset =
  | 'default'
  | 'high-contrast'
  | 'bright-light'
  | 'pastel'
  | 'vibrant'
  | 'dark'
  | 'hyper-color';

export const GenerativeThemePresetEnum = createEnum([
  'default',
  'high-contrast',
  'bright-light',
  'pastel',
  'vibrant',
  'dark',
  'hyper-color',
] as const);

export type Theme = {
  'color-scheme': ThemeColorScheme;
  variant: ThemeVariant;
  preset?: StaticThemePreset | MuiThemePreset;
  reverse?: boolean;
  debug?: boolean;
  contrast?: number;
  baseColors: {
    primary: string;
    secondary?: string;
    accent?: string;
    neutral?: string;
  };
};

export type Themes = Record<string, Theme>;

export type {
  SchemistColor,
  RgbColor,
  HslColor,
  LchColor,
} from './color/types';
