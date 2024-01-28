import { useContext, useEffect, useState } from 'react';
import { withThemeByClassName } from '@storybook/addon-themes';
import {
  Controls,
  Description,
  DocsContainer,
  DocsContext,
  DocsStory,
  Primary,
  Subtitle,
  Title,
} from '@storybook/blocks';
import { H2 } from '@storybook/components';
import { GLOBALS_UPDATED } from '@storybook/core-events';
import type { Preview } from '@storybook/react';
import { styled } from '@storybook/theming';
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

const CustomControls = () => {
  const context = useContext(DocsContext);
  const { story } = context.resolveOf('story', ['story']);
  const parameters = story.parameters as Record<string, unknown>;
  const controls = parameters.controls as Record<string, unknown> | undefined;
  const controlsDisabled = !!controls?.disable;

  // Hide the controls if they are disabled.
  if (controlsDisabled) return null;

  return <Controls />;
};

export const StoriesHeading = styled(H2)(({ theme }) => ({
  fontSize: `${theme.typography.size.s2 - 1}px`,
  fontWeight: theme.typography.weight.bold,
  lineHeight: '16px',
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color: theme.textMutedColor as string,
  border: 0,
  marginBottom: '12px',

  '&:first-of-type': {
    // specificity issue
    marginTop: '56px',
  },
}));

const CustomStories = () => {
  const { componentStories } = useContext(DocsContext);

  const allStories = componentStories();
  const isDefaultStory = (s: (typeof allStories)[number]) =>
    ['default', 'primary'].includes(s.name.toLowerCase());

  const defaultStory = allStories.find(isDefaultStory);

  const stories = allStories
    // Don't include the default or primary story.
    .filter((s) => !isDefaultStory(s))
    // Do not show stories that have interactive tests.
    .filter((s) => !s.playFunction);

  return (
    <>
      {!!defaultStory && (
        <Description of={defaultStory.moduleExport as unknown} />
      )}
      {stories.length > 0 && (
        <>
          <StoriesHeading>Examples</StoriesHeading>
          {stories.map(
            (story) =>
              story && (
                <DocsStory
                  key={story.id}
                  of={story.moduleExport as unknown}
                  expanded
                  __forceInitialArgs
                />
              ),
          )}
        </>
      )}
    </>
  );
};

const autoDocsTemplate = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Primary />
    <CustomControls />
    <CustomStories />
  </>
);

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
      page: autoDocsTemplate,
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
