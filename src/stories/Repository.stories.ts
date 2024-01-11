import type { Meta, StoryObj } from '@storybook/react';
import Repository from '../components/Repository';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Repository',
  component: Repository,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      description: 'The name of the repository.',
      type: { name: 'string', required: true },
      defaultValue: 'Repository',
      control: {
        type: 'text',
      },
    },
    description: {
      description: 'The description of the repository.',
      type: { name: 'string', required: true },
      defaultValue: 'This is a repository.',
      control: {
        type: 'text',
      },
    },
    url: {
      description: 'The URL of the repository.',
      type: { name: 'string', required: true },
      defaultValue: 'https://github.com',
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof Repository>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    name: 'Repository',
    description: 'This is a repository.',
    url: 'https://github.com',
  },
};
