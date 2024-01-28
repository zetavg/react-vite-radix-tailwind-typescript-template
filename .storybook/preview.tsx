import { useEffect, useState } from 'react';
import { withThemeByClassName } from '@storybook/addon-themes';
import { DocsContainer } from '@storybook/blocks';
import { GLOBALS_UPDATED } from '@storybook/core-events';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { Globals } from '@storybook/types';

import '../src/index.css';
import './storybook.css';

const CustomDocsContainer = ({
  context,
  children,
  ...props
}: React.ComponentProps<typeof DocsContainer>) => {
  // Get the initial theme of `@storybook/addon-themes` from the first story's context.
  const firstStory = context.componentStories()[0];
  const storyContext = firstStory
    ? context.getStoryContext(firstStory)
    : undefined;
  const initialTheme: unknown = storyContext?.globals.theme;

  // The theme set with the `@storybook/addon-themes` addon.
  const [theme, setTheme] = useState<string | undefined>(
    typeof initialTheme === 'string' ? initialTheme : undefined,
  );

  // Subscribe to theme changes.
  useEffect(() => {
    const onGlobalsUpdated = (changed: { globals: Globals }) => {
      const nextTheme: unknown = changed.globals.theme;
      setTheme(typeof nextTheme === 'string' ? nextTheme : undefined);
    };
    context.channel.on(GLOBALS_UPDATED, onGlobalsUpdated);
    return () => context.channel.off(GLOBALS_UPDATED, onGlobalsUpdated);
  }, [context.channel]);

  return (
    <DocsContainer
      {...props}
      context={context}
      theme={theme === 'dark' ? themes.dark : themes.light}
    >
      {children}
    </DocsContainer>
  );
};

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
      container: CustomDocsContainer,
    },
  },
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

export default preview;
