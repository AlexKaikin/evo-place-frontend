import type { Meta } from '@storybook/react'
import { Pagination } from '@ui'

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
  },
}

export default meta

export const Default = { args: { totalCount: '20' } }
