import type { Preview } from '@storybook/react';

import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      exclude: /^(on.+|asChild)/g, // e.g. onClick, asChild, etc.
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
