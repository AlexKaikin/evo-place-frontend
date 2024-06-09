'use client'

import { useRouter } from 'next/navigation'
import { Button, Icon } from '@ui'

export function AddProductButton() {
  const router = useRouter()
  return (
    <Button
      startIcon={<Icon name="BsPlus" />}
      onClick={() => router.push('/admin/products/new')}
    >
      Добавить
    </Button>
  )
}
