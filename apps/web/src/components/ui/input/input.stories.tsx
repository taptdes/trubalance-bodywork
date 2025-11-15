import type { StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Input } from './input'
import type { EnhancedInputProps } from './types'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameter: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'contrast', 'critical', 'neutral'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'outlined', 'ghost'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    linkStyle: { control: 'boolean' },
    icon: { control: 'boolean' },
    // REMOVE children control to allow JSX
    as: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    size: 'md',
    color: 'primary',
    variant: 'filled',
    disabled: false,
    children: 'Button',
    onClick: fn()
  } satisfies EnhancedInputProps,
}

export default meta

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    children: 'Button'
  },
}



export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}


