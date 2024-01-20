import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '@ui'

const meta: Meta<typeof Textarea> = {
  title: 'Inputs/Textarea',
  component: Textarea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => {
    return <Textarea placeholder="Placeholder" label="Label" rows={5} />
  },
}
