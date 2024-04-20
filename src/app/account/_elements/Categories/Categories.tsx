'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLangs } from '@store'
import { Menu, Stack, Widget } from '@ui'

export function Categories() {
  const router = useRouter()
  const pathname = usePathname()
  const { lang, translate } = useLangs()
  const currentCategory = pathname.split('/')[2]

  return (
    <Widget title={translate[lang].account.mobileMenu.sections} icon="BsGrid">
      <Stack gap={10}>
        <Menu
          label={translate[lang].account.mobileMenu.profile}
          variant="category"
          action={() => router.push('/account')}
          active={!currentCategory ? true : false}
        />
        <Menu
          label={translate[lang].account.mobileMenu.orders}
          variant="category"
          action={() => router.push('/account/orders')}
          active={currentCategory === 'orders' ? true : false}
        />
        <Menu
          label={translate[lang].account.mobileMenu.reviews}
          variant="category"
          action={() => router.push('/account/reviews')}
          active={currentCategory === 'reviews' ? true : false}
        />
        <Menu
          label={translate[lang].account.mobileMenu.comments}
          variant="category"
          action={() => router.push('/account/comments')}
          active={currentCategory === 'comments' ? true : false}
        />
      </Stack>
    </Widget>
  )
}
