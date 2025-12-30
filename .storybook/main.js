module.exports = {
  stories: ['../stories/**/*.stories.{ts,tsx}'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  }
};
