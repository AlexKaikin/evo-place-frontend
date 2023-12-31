import React from 'react'
import '@assets/styles/_var.css'
import '@assets/styles/globals.css'
import type { Preview } from '@storybook/react'
import { Stack } from '../src/ui'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
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
        <Stack alignItems="center" justifyContent="center">
          <Story />
        </Stack>
      )
    },
  ],
}

export default preview
