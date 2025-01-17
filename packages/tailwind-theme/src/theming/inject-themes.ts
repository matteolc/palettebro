import pc from 'picocolors';
import type { PluginOptions } from '../types';
import { generateThemeTokens } from './generate-theme-tokens';

const THEME_ROOT = ':root';

const injectThemes = (
  // biome-ignore lint/suspicious/noExplicitAny: Tailwind's addBase accepts various CSS-like objects
  addBase: (...args: any[]) => void,
  { themes, darkTheme }: Pick<PluginOptions, 'themes' | 'darkTheme'>,
) => {
  // biome-ignore lint/suspicious/noExplicitAny: Theme values contain complex nested CSS properties
  const includedThemes: Record<string, any> = {};
  for (const [theme, value] of Object.entries(themes)) {
    Object.assign(includedThemes, { [theme]: generateThemeTokens(value) });
  }

  const themeNames = Object.keys(themes);
  // biome-ignore lint/suspicious/noExplicitAny: CSS selectors and values have complex nested structures
  const themesToInject: Record<string, any> = {};

  // Set root theme (first theme)
  if (themeNames.length > 0) {
    const defaultTheme = themeNames[0];
    themesToInject[THEME_ROOT] = includedThemes[defaultTheme];
  }

  // Handle dark mode
  const hasDarkTheme = themeNames.includes('dark');
  const shouldAddDarkMode =
    darkTheme !== false && hasDarkTheme && themeNames[0] !== 'dark';

  if (shouldAddDarkMode) {
    themesToInject['@media (prefers-color-scheme: dark)'] = {
      [THEME_ROOT]: includedThemes.dark,
    };
  }
  // Add data-theme selectors for all themes
  for (const themeName of themeNames) {
    themesToInject[`[data-theme=${themeName}]`] = includedThemes[themeName];
  }

  addBase(themesToInject);

  if (themeNames.length > 0) {
    console.log(
      `├─ ${pc.green('✔︎')} ${themeNames.length} ${
        themeNames.length > 1 ? 'themes' : 'theme'
      } added`,
    );
  }
  if (themeNames.length === 0) {
    console.log(`├─ ${pc.yellow('ℹ︎')} All themes are disabled in config`);
  }
};

export { injectThemes };
