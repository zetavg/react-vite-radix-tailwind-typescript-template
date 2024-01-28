import {
  ChevronRightIcon,
  EnvelopeOpenIcon,
  ImageIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from './button';

/**
 * Displays a button or a component that looks like a button.
 */
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    onClick: fn(),
  },
  argTypes: {
    children: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

/**
 * ## Links
 *
 * You can set the `asChild` prop and nest a link component to create a link that looks like a button.
 *
 * ```jsx
 * <Button asChild>
 *   <a href="/">Go Home</a>
 * </Button>
 * ```
 */
export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center gap-2">
        <Button size="sm">Size: sm</Button>
        <Button size="default">Size: default</Button>
        <Button size="lg">Size: lg</Button>
        <Button size="icon">
          <ImageIcon />
        </Button>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button variant="secondary" size="sm">
          Size: sm
        </Button>
        <Button variant="secondary" size="default">
          Size: default
        </Button>
        <Button variant="secondary" size="lg">
          Size: lg
        </Button>
        <Button variant="secondary" size="icon">
          <ImageIcon />
        </Button>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button variant="outline" size="sm">
          Size: sm
        </Button>
        <Button variant="outline" size="default">
          Size: default
        </Button>
        <Button variant="outline" size="lg">
          Size: lg
        </Button>
        <Button variant="outline" size="icon">
          <ImageIcon />
        </Button>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button variant="ghost" size="sm">
          Size: sm
        </Button>
        <Button variant="ghost" size="default">
          Size: default
        </Button>
        <Button variant="ghost" size="lg">
          Size: lg
        </Button>
        <Button variant="ghost" size="icon">
          <ImageIcon />
        </Button>
      </div>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Primary: Story = {
  args: {
    variant: 'default',
  },
  parameters: {
    controls: {
      exclude: /^(variant|asChild)$/g,
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  parameters: {
    controls: {
      exclude: /^(variant|asChild)$/g,
    },
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  parameters: {
    controls: {
      exclude: /^(variant|asChild)$/g,
    },
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  parameters: {
    controls: {
      exclude: /^(variant|asChild)$/g,
    },
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  parameters: {
    controls: {
      exclude: /^(variant|asChild)$/g,
    },
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
  parameters: {
    controls: {
      exclude: /^(variant|asChild)$/g,
    },
  },
};

export const Icon: Story = {
  render: (args) => (
    <Button variant="outline" size="icon" {...args}>
      <ChevronRightIcon className="h-4 w-4" />
    </Button>
  ),
  parameters: {
    controls: {
      exclude: /.*/g,
      disable: true,
    },
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
    </Button>
  ),
  parameters: {
    controls: {
      exclude: /.*/g,
      disable: true,
    },
  },
};

export const Loading: Story = {
  render: (args) => (
    <Button disabled {...args}>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ),
  parameters: {
    controls: {
      exclude: /.*/g,
      disable: true,
    },
  },
};

export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="javascript:alert('a element clicked')">Go Home</a>
    </Button>
  ),
  parameters: {
    controls: {
      exclude: /.*/g,
      disable: true,
    },
  },
};
