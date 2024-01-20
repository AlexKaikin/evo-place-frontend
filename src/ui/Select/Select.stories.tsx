import type { Meta, StoryObj } from '@storybook/react'
import { Select, Option } from '@ui'

const meta: Meta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => {
    return (
      <Select>
        <Option label="Option 1" />
        <Option label="Option 2" />
        <Option label="Option 3" />
      </Select>
    )
  },
}
