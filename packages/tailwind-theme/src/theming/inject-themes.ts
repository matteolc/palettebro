import pc from 'picocolors';
import type { PluginOptions } from '..';
import { generateThemeTokens } from './generate-theme-tokens';

const THEME_ROOT = ':root';

const injectThemes = (
  // biome-ignore lint/suspicious/noExplicitAny: No will to type this
  addBase: (...args: any[]) => void,
  { themes, darkTheme }: Pick<PluginOptions, 'themes' | 'darkTheme'>,
) => {
  const includedThemes = {};

  for (const [theme, value] of Object.entries(themes)) {
    Object.assign(includedThemes, { [theme]: generateThemeTokens(value) });
  }

  const DEFAULT_THEMES = Object.keys(themes);

  const themesToInject = {};
  DEFAULT_THEMES.forEach(([themeName, value], index) => {
    if (index === 0) {
      // first theme as root
      themesToInject[THEME_ROOT as keyof typeof themesToInject] =
        includedThemes[themeName as keyof typeof includedThemes];
    } else if (index === 1) {
      // auto dark
      if (darkTheme) {
        if (DEFAULT_THEMES[0] !== 'dark' && DEFAULT_THEMES.includes('dark')) {
          Object.assign(themesToInject, {
            ['@media (prefers-color-scheme: dark)' as keyof typeof themesToInject]:
              {
                [THEME_ROOT as keyof typeof themesToInject]:
                  includedThemes['dark' as keyof typeof includedThemes],
              },
          });
        }
      } else if (darkTheme === false) {
        // disables prefers-color-scheme: dark
      } else {
        if (DEFAULT_THEMES[0] !== 'dark' && DEFAULT_THEMES.includes('dark')) {
          Object.assign(themesToInject, {
            ['@media (prefers-color-scheme: dark)' as keyof typeof themesToInject]:
              {
                [THEME_ROOT as keyof typeof themesToInject]:
                  includedThemes['dark' as keyof typeof includedThemes],
              },
          });
        }
      }
      // theme 0 with name
      themesToInject[
        `[data-theme=${DEFAULT_THEMES[0]}]` as keyof typeof themesToInject
      ] = includedThemes[DEFAULT_THEMES[0] as keyof typeof includedThemes];
      // theme 1 with name
      themesToInject[
        `[data-theme=${DEFAULT_THEMES[1]}]` as keyof typeof themesToInject
      ] = includedThemes[DEFAULT_THEMES[1] as keyof typeof includedThemes];
    } else {
      themesToInject[
        `[data-theme=${themeName}]` as keyof typeof themesToInject
      ] = includedThemes[themeName as keyof typeof includedThemes];
    }
  });

  addBase(themesToInject);

  if (DEFAULT_THEMES.length > 0) {
    console.log(
      `├─ ${pc.green('✔︎')} ${DEFAULT_THEMES.length} ${
        DEFAULT_THEMES.length > 1 ? 'themes' : 'theme'
      } added`,
    );
  }
  if (DEFAULT_THEMES.length === 0) {
    console.log(`├─ ${pc.yellow('ℹ︎')} All themes are disabled in config`);
  }
};

export { injectThemes };
