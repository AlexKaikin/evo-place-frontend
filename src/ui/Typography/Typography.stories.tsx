import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stack, Typography } from '@ui'
import { fontVariants } from '../constants'

const meta: Meta<typeof Typography> = {
  title: 'Data display/Typography',
  component: Typography,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  args: {
    children: 'Typography',
  },
}

export const Variants: Story = {
  render: () => {
    return (
      <Stack gap={40}>
        {fontVariants.map(fontVariant => (
          <Typography key={fontVariant} variant={fontVariant}>
            {fontVariant}
          </Typography>
        ))}
      </Stack>
    )
  },
}
