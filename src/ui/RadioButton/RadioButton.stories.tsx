import type { Meta, StoryObj } from '@storybook/react'
import { Stack, RadioButton } from '@ui'

const meta: Meta<typeof RadioButton> = {
  title: 'Inputs/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioButton>

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
  render: args => {
    return <RadioButton {...args} />
  },
}

export const State: Story = {
  render: () => {
    return (
      <Stack gap={40}>
        <RadioButton defaultChecked />
        <RadioButton />
      </Stack>
    )
  },
}
