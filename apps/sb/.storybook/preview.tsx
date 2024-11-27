import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import React from 'react';
import StoryLayout from './StoryLayout';
import theme from './theme';
import { DEFAULT_THEME, STORAGE_KEY, THEME_PICKER_LIST } from './theming';

import '../styles.css';
// import '../mockup.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    layout: 'fullscreen',
    darkMode: {
      stylePreview: true,
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      dark: { ...themes.dark },
      light: { ...themes.light },
    },
    backgrounds: { disable: true },
    docs: {
      theme,
      options: {
        layout: 'fullscreen',
      },
    },
    themes: {
      default: window.localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME,
      onChange: (theme: { class: string; }) => {
        if (theme) {
          window.localStorage.setItem('sb-react-preview-theme', theme.class);
        } else {
          window.localStorage.removeItem('sb-react-preview-theme');
        }
      },
      list: THEME_PICKER_LIST,
    },
  },
  decorators: [
    (Story, options) => (
      <StoryLayout
        title={options.title}
        description={options.name}
        source={options.parameters.docs.source.originalSource
          /* TODO: clean up all this string formatting/regex */
          /* Removes the args arrow function */
          .replace(/^args\s*=>\s*\{\s*/, '    ')
          .replace(/\(.*args.*\)\s*=>\s*\{\s*\n/, '    ')
          .replace(/^(\s*)return\s+/, '$1')
          .replace(/_s\(\);/, '')
          /* Removes the last occurence of a closing bracket (from the lambda) */
          .replace(/}([^}]*)$/, '$1')
          /* Removes the last occurence of a semicolon */
          .replace(/;(?=[^;]*$)/, '')}
      >
        <Story />
      </StoryLayout>
    ),
  ],
};

export default preview;
