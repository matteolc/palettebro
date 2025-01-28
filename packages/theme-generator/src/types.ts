import type { SchemistColor } from './color';
import { getDynamicPalette } from './palettes/getDynamicPalette';
import { getMuiPalette } from './palettes/getMuiPalette';
import { getStaticPalette } from './palettes/getStaticPalette';
import { createEnum } from './utils/create-enum';

export type ThemeColorScheme = 'light' | 'dark';
export type ThemeVariant = 'mui' | 'static' | 'dynamic' | 'kobayashi';

export const ThemeColorSchemeEnum = createEnum(['light', 'dark'] as const);
export const ThemeVariantEnum = createEnum([
  'mui',
  'static',
  'dynamic',
  'kobayashi',
] as const);

export const ThemeVariantToPalette = {
  mui: getMuiPalette,
  static: getStaticPalette,
  dynamic: getDynamicPalette,
  kobayashi: getDynamicPalette,
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

export type GenerativeThemePage =
  | 'website-magazine'
  | 'brand-2'
  | 'brand-3'
  | 'website-1';
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

export type ColorShadesPreset = 'tailwind' | 'mui' | 'bootstrap';

export const ColorShadesPresetEnum = createEnum([
  'tailwind',
  'mui',
  'bootstrap',
] as const);

export type Theme = {
  'color-scheme': ThemeColorScheme;
  variant: ThemeVariant;
  preset?: StaticThemePreset | MuiThemePreset;
  reverse?: boolean;
  debug?: boolean;
  contrast?: number;
  reverseLightDarkShades?: boolean;
  colorShadesPreset?: ColorShadesPreset;
  baseColors: {
    primary: string;
    secondary?: string;
    accent?: string;
    neutral?: string;
  };
};

export type ThemePalette = {
  primaryColor: SchemistColor;
  secondaryColor?: SchemistColor;
  accentColor?: SchemistColor;
  isDark: boolean;
} & Pick<
  Theme,
  | 'preset'
  | 'contrast'
  | 'reverse'
  | 'debug'
  | 'reverseLightDarkShades'
  | 'colorShadesPreset'
>;

export type Themes = Record<ThemeColorScheme, Theme>;

export type Palette = Record<string, { color: string; name: string }>;

export type KobayashiImage =
  | 'pretty'
  | 'casual'
  | 'dynamic'
  | 'gorgeous'
  | 'romantic'
  | 'natural'
  | 'elegant'
  | 'chich'
  | 'classic'
  | 'clear'
  | 'modern';

export const KobayashiImageEnum = createEnum([
  'pretty',
  'casual',
  'dynamic',
  'gorgeous',
  'romantic',
  'natural',
  'elegant',
  'chich',
  'classic',
  'clear',
  'modern',
] as const);

export type {
  SchemistColor,
  RgbColor,
  HslColor,
  LchColor,
} from './color/types';
