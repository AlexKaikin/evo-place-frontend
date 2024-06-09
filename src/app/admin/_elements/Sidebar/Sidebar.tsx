'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLangs } from '@store'
import { Menu, Stack, Widget } from '@ui'

export function Sidebar() {
  const router = useRouter()
  const { lang, translate } = useLangs()
  const category = usePathname().split('/')[2]
  const changeCategory = (category: string | undefined) => {
    category ? router.push(`/admin/${category}`) : router.push(`/admin`)
  }

  const menu = [
    { label: translate[lang].admin.nav.dashboard, path: undefined },
    { label: translate[lang].admin.nav.products, path: 'products' },
    { label: translate[lang].admin.nav.reviews, path: 'reviews' },
    { label: translate[lang].admin.nav.orders, path: 'orders' },
    { label: translate[lang].admin.nav.articles, path: 'articles' },
    { label: translate[lang].admin.nav.comments, path: 'comments' },
    { label: translate[lang].admin.nav.feedback, path: 'feedback' },
  ]

  return (
    <Widget>
      <Stack gap={10}>
        {menu.map(({ label, path }, index) => (
          <Menu
            key={index}
            label={label}
            variant="category"
            action={() => changeCategory(path)}
            active={category === path}
          />
        ))}
      </Stack>
    </Widget>
  )
}
