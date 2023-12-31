import type { Meta, StoryObj } from '@storybook/react'
import { Menu, MenuItem } from '@ui'

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {
    label: 'Menu',
  },
  render: args => {
    return (
      <Menu {...args}>
        <Menu label={'Tea'}>
          <MenuItem label={'Green'} />
          <MenuItem label={'Red'} />
        </Menu>
        <Menu label={'Coffee'}>
          <MenuItem label={'Bean'} />
          <MenuItem label={'Ground'} />
        </Menu>
        <MenuItem label={'Spices'} />
      </Menu>
    )
  },
}
