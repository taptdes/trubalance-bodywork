import React from 'react'
import { Title, Description, Controls, Canvas } from '@storybook/addon-docs/blocks'
import type { Meta, StoryObj } from '@storybook/react-vite'
import '../index.css'
import { DEVICES_MAP } from './breakpoints'

interface TypeBoxProps {
  type: string
  device: keyof typeof DEVICES_MAP
  children?: React.ReactNode
}

const TypeBox = ({ type, device, children }: TypeBoxProps) => {
  const classList = [type]
  const width = DEVICES_MAP[device]
  const fontClass = classList.join(' ')
  return (
    <div
      className={fontClass}
      style={{
        width: width,
        height: '200px',
        background: 'white',
        margin: '20px',
        paddingRight: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
      }}
    >
      {children ||
        'Lorem ipsum dolor sit amet consectetur. Suscipit egestas id iaculis volutpat dui proin vulputate lacus diam. Sed massa fringilla lectus in in nec non placerat. Potenti cursus urna potenti ut sollicitudin netus. Eu fringilla consectetur sed nibh.'}
    </div>
  )
}

const CustomDocsPage = () => (
  <>
    <Title>Typography</Title>
    <Description />
    <Canvas />
    <Controls />
  </>
)

const meta: Meta<typeof TypeBox> = {
  title: 'Typography',
  component: TypeBox,
  parameters: {
    docs: {
      page: CustomDocsPage,
      description: {
        component:
          'Use typography to present your design and content as clearly and efficiently as possible. In addition to ensuring legible text, your typographic choices can help you clarify an information hierarchy, communicate important content, and express your brand.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'title-hero',
        'title-page',
        'title-section',
        'subtitle',
        'text-lg',
        'text-base',
        'text-sm',
        'text-label',
        'text-caption',
      ],
      description: 'This is the control for the font style',
    },
    device: {
      control: 'select',
      options: ['mobile', 'desktop'],
      description: 'This is the control for the device type',
      defaultValue: 'mobile',
    },
  },
}

export default meta

const Template: StoryObj<TypeBoxProps> = {
  args: {
    type: 'type-h1',
    device: 'mobile',
  },
  render: args => <TypeBox {...args} />,
}

export const Default = Template

export const Mobile = {
  ...Template,
  args: { ...Template.args, device: 'mobile' },
}

export const Desktop = {
  ...Template,
  args: { ...Template.args, device: 'desktop' },
}
