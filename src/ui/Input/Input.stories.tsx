import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@ui'

const meta: Meta<typeof Input> = {
  title: 'Inputs/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default = {
  args: {
    placeholder: 'Placeholder',
  },
}

export const Label: Story = {
  render: args => {
    return <Input {...args} label="Label" placeholder="placeholder" />
  },
}
