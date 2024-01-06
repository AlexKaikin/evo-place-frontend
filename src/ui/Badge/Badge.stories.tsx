import type { Meta, StoryObj } from '@storybook/react'
import { Badge, IconButton } from '@ui'

const meta: Meta<typeof Badge> = {
  title: 'Data display/Badge',
  component: Badge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: <IconButton icon="BsBag" />,
    value: 2,
  },
}
