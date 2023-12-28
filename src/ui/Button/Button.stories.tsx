import type { Meta, StoryObj } from '@storybook/react'
import { Stack, Button, Icon } from '@ui'

const meta: Meta<typeof Button> = {
  title: 'UI Components/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default = {
  args: {
    children: 'button',
  },
}

export const Color: Story = {
  render: args => {
    return (
      <Stack gap={10}>
        <Button {...args}>primary</Button>
        <Button {...args} color="secondary">
          secondary
        </Button>
        <Button {...args} color="success">
          success
        </Button>
        <Button {...args} color="warning">
          warning
        </Button>
        <Button {...args} color="error">
          error
        </Button>
        <Button {...args} color="info">
          info
        </Button>
      </Stack>
    )
  },
}

export const Size: Story = {
  render: args => {
    return (
      <Stack gap={10}>
        <Button {...args} size="small">
          small
        </Button>
        <Button {...args} size="medium">
          medium
        </Button>
        <Button {...args} size="large">
          large
        </Button>
      </Stack>
    )
  },
}

export const Icons: Story = {
  render: args => {
    return (
      <Stack gap={10}>
        <Button {...args} startIcon={<Icon name="BsChevronLeft" />}>
          startIcon
        </Button>
        <Button {...args} endIcon={<Icon name="BsChevronRight" />}>
          endIcon
        </Button>
      </Stack>
    )
  },
}

export const Variant: Story = {
  render: args => {
    return (
      <Stack gap={10}>
        <Button {...args} variant="text">
          text
        </Button>
        <Button {...args} variant="contained">
          contained
        </Button>
        <Button {...args} variant="outlined">
          outlined
        </Button>
      </Stack>
    )
  },
}

export const State: Story = {
  render: args => {
    return (
      <Stack gap={10}>
        <Button {...args} disabled>
          disabled
        </Button>
      </Stack>
    )
  },
}
