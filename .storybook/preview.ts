import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      exclude: /^on.+/g, // e.g. onClick, etc.
    },
  },
};

export default preview;
