import {
  ColorShadesPresetEnum,
  GenerativeThemeModeEnum,
  GenerativeThemePageEnum,
  GenerativeThemePresetEnum,
  MuiThemePresetEnum,
  StaticThemePresetEnum,
} from '@palettebro/theme-generator/types';

export const DEFAULT_STATIC_PRESET = StaticThemePresetEnum['hue-shift'];
export const DEFAULT_MUI_PRESET = MuiThemePresetEnum.fidelity;
export const DEFAULT_COLOR_SHADES_PRESET = ColorShadesPresetEnum.tailwind;
export const DEFAULT_CONTRAST = 0.0;
export const DEFAULT_GENERATIVE_MODE = GenerativeThemeModeEnum.transformer;
export const DEFAULT_GENERATIVE_PAGE = GenerativeThemePageEnum['brand-2'];
export const DEFAULT_GENERATIVE_PRESET = GenerativeThemePresetEnum.pastel;
export const DEFAULT_GENERATIVE_NUM_COLORS = 3;
export const DEFAULT_GENERATIVE_TEMPERATURE = 1.2;

export const BASE_TOKENS = ['primary', 'secondary', 'accent', 'surface'];
export const STATUS_TOKENS = ['info', 'success', 'warning', 'error'];
