import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'
import { IconMapping } from './mapping'
import type { AvailableIcons } from './mapping'

const iconNames = Object.keys(IconMapping) as AvailableIcons[]

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: { type: 'select' },
      options: iconNames,
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    name: iconNames[0],
    size: 'md',
  },
}

export default meta

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {},
}

export const AllIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      {iconNames.map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon {...args} name={name} />
          <span style={{ fontSize: 12, marginTop: 4 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    size: 'md',
  },
}