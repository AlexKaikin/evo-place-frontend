import type { Meta, StoryObj } from '@storybook/react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeading,
  PopoverDescription,
  PopoverClose,
} from '@ui'

const meta: Meta<typeof Popover> = {
  title: 'Utils/Popover',
  component: Popover,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>
          <PopoverHeading>Heading</PopoverHeading>
          <PopoverDescription>Description</PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
    )
  },
}
