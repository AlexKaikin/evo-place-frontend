import { useState } from 'react'
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

export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger onClick={() => setOpen(v => !v)}>
          Trigger
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeading>Heading</PopoverHeading>
          <PopoverDescription>Description</PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
    )
  },
}
