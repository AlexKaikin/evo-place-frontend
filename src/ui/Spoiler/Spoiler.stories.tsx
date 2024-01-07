import type { Meta, StoryObj } from '@storybook/react'
import { Spoiler } from '@ui'

const meta: Meta<typeof Spoiler> = {
  title: 'Data display / Spoiler',
  component: Spoiler,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Spoiler>

export const Default: Story = {
  args: {
    showLabel: 'Show more',
    hideLabel: 'Hide',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
}
