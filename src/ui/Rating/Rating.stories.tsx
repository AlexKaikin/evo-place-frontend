import type { Meta, StoryObj } from '@storybook/react'
import { Rating, Stack } from '@ui'

const meta: Meta<typeof Rating> = {
  title: 'Inputs/Rating',
  component: Rating,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Rating>

export const Default = {
  args: {
    value: 4,
  },
}

export const Size: Story = {
  render: () => {
    return (
      <Stack direction="row" gap={20}>
        <Rating value={4} size={10} />
        <Rating value={4} size={20} />
        <Rating value={4} size={30} />
      </Stack>
    )
  },
}
