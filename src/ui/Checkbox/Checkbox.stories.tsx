import type { Meta, StoryObj } from '@storybook/react'
import { Stack, Checkbox } from '@ui'

const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
  render: args => {
    return <Checkbox {...args} />
  },
}

export const State: Story = {
  render: () => {
    return (
      <Stack gap={40}>
        <Checkbox defaultChecked />
        <Checkbox />
      </Stack>
    )
  },
}
