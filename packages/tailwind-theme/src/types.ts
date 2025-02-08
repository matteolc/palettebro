import type { Themes } from '@palettebro/theme-generator';

export type PluginOptions = {
  themes: Themes;
  utils: boolean;
  darkTheme?: boolean;
  addThemes?: boolean;
};
