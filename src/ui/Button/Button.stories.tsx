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
        <Button>primary</Button>
        <Button color="secondary">secondary</Button>
        <Button color="success">success</Button>
        <Button color="warning">warning</Button>
        <Button color="error">error</Button>
        <Button color="info">info</Button>
      </Stack>
    )
  },
}

export const Size: Story = {
  render: args => {
    return (
      <Stack gap={10}>
        <Button size="small">small</Button>
        <Button size="medium">medium</Button>
        <Button size="large">large</Button>
      </Stack>
    )
  },
}

export const Icons: Story = {
  render: args => {
    return (
      <Stack gap={10}>
        <Button startIcon={<Icon name="BsChevronLeft" />}>startIcon</Button>
        <Button endIcon={<Icon name="BsChevronRight" />}>endIcon</Button>
      </Stack>
    )
  },
}

export const Variant: Story = {
  render: args => {
    return (
      <Stack gap={10}>
        <Button variant="text">text</Button>
        <Button variant="contained">contained</Button>
        <Button variant="outlined">outlined</Button>
      </Stack>
    )
  },
}

export const State: Story = {
  render: args => {
    return (
      <Stack gap={10}>
        <Button disabled>disabled</Button>
        <Button readOnly>readonly</Button>
      </Stack>
    )
  },
}
