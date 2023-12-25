import type { Preview } from '@storybook/react'
import '@assets/styles/_var.css'
import '@assets/styles/globals.css'
//@ts-ignore
import { Stack } from '@ui'
import React from 'react'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'rgb(13 20 33)',
        },
        {
          name: 'light',
          value: 'rgb(255, 255, 255)',
        },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => {
      return (
        <Stack>
          <Story />
        </Stack>
      )
    },
  ],
}

export default preview
