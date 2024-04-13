'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Menu, Stack, Widget } from '@/ui'

export function Categories() {
  const router = useRouter()
  const pathname = usePathname()
  const currentCategory = pathname.split('/')[2]

  return (
    <Widget title="Sections" icon="BsGrid">
      <Stack gap={10}>
        <Menu
          label="Profile"
          variant="category"
          action={() => router.push('/account')}
          active={!currentCategory ? true : false}
        />
        <Menu
          label="Orders"
          variant="category"
          action={() => router.push('/account/orders')}
          active={currentCategory === 'orders' ? true : false}
        />
        <Menu
          label="Reviews"
          variant="category"
          action={() => router.push('/account/reviews')}
          active={currentCategory === 'reviews' ? true : false}
        />
        <Menu
          label="Comments"
          variant="category"
          action={() => router.push('/account/comments')}
          active={currentCategory === 'comments' ? true : false}
        />
      </Stack>
    </Widget>
  )
}
