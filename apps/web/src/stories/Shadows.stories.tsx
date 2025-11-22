import {
  //Title,
  Description,
 // Stories,
 // Controls,
 // Canvas,
} from '@storybook/addon-docs/blocks'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components/ui/button/button'
// import { Icon } from '@/components/ui/Icon'
import '../index.css'
import ArgTypeTable from '../../.storybook/CustomDocs/ArgTypeTable'
import { CopyButton } from '../../.storybook/CustomDocs/CopyButton'

type Story = StoryObj<typeof Button>

const data = [
  {
    class: 'shadow-none',
    shadow:
      'Flat elevation with no visible shadow. Used for elements that are not intended to stand out.',
    usage: 'Suppressed content: Cards',
    boxShadow: 'none',
  },
  {
    class: 'shadow-sm',
    shadow:
      'This level is applied to elements that are actionable so it&apos;s visually clear that you can click on the element.',
    usage: 'Actionable content: Button',
    boxShadow: 'var(--shadow-sm)',
  },
  {
    class: 'shadow-md',
    shadow:
      'This elevation level is applied to elements that are fixed at the top of the page while scrolling, and for elements in a hover state.',
    usage: 'Raised content: Button on hover or NavigationBar',
    boxShadow: 'var(--shadow-md)',
  },
  {
    class: 'shadow-lg',
    shadow:
      'This level is used in the Modal and Popover components, which also has a background overlay with opacity when focus is changed.',
    usage: 'Overlay content: Modal or Popover',
    boxShadow: 'var(--shadow-lg)',
  },
]

const columns = [
  {
    label: 'Visual Style',
    key: 'boxShadow',
    render: (item: typeof data[number]) => (
      <div
        className='h-14 w-14 rounded-lg'
        style={{
          backgroundColor: 'white',
          border: '1px solid #E4E5EE',
          boxShadow: item.boxShadow,
          marginRight: '32px',
          marginTop: '4px',
        }}
      ></div>
    ),
  },
  {
    label: 'Shadow Levels',
    key: 'shadow',
    render: (item: typeof data[number]) => (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <strong
            style={{
              fontSize: '13px',
              verticalAlign: 'top',
            }}
          >
            {item.class}
          </strong>
        </div>
        <div
          style={{
            fontSize: '13px',
            lineHeight: '150%',
            marginBottom: '4px',
          }}
        >
          {item.shadow}
        </div>
      </>
    ),
  },
  {
    label: 'Usage',
    key: 'usage',
  },
  {
    label: 'Actions',
    key: 'actions',
    width: '1/4',
    render: (item: typeof data[number]) => (
      <CopyButton
        copiedIcon='check'
        label='Copy'
        text={item.class}
        onCopy={() => console.log('Copied:', item.class)}
      />
    ),
  },
]

const ButtonDocsPage = () => (
  <>
    <Description />
    <div>
      <ArgTypeTable columns={columns} data={data} />
    </div>
  </>
)

const meta: Meta<typeof Button> = {
  title: 'Shadows',
  component: Button,
  parameters: {
    docs: {
      page: ButtonDocsPage,
      description: {
        component: `
This documentation details the shadow levels used across the design system. Each level serves a specific visual function:
        `,
      },
    },
  },
  tags: ['autodocs'],
}

{
  /*
    controls: { hideNoControlsWarning: true },
    previewTabs: {
      canvas: { hidden: true },
    },
    includeStories: [],
  */
}

export default meta

export const Filled: Story = {
  args: {
    children: 'Filled',
    size: 'md',
    variant: 'filled',
  },
}

{
  /*
parameters: {
    docsOnly: true
  }
  */
}
