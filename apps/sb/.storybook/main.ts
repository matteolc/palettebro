const config = {
  stories: ['../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-vite',
  },

  // biome-ignore lint/suspicious/noExplicitAny: TODO: fix this
  async viteFinal(config: any) {
    return {
      ...config,
      define: { 'process.env': {} },
      resolve: {
        alias: [
          {
            find: 'ui',
            replacement: '../../../packages/ui/',
          },
        ],
      },
    };
  },

  docs: {
    autodocs: false,
  },
};

export default config;
