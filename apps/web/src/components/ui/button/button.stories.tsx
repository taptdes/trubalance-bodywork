import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import type { ButtonProps } from './types'
import { Icon } from '@/components/ui/Icon/Icon'

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
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
    loading: false,
    disabled: false,
    linkStyle: false,
    icon: false,
    children: 'Button',
  },
}

export default meta

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {},
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading…',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const IconButton: Story = {
  args: {
    icon: true,
    children: <Icon name="phone" size="md" />,
    'aria-label': 'phone',
  },
}