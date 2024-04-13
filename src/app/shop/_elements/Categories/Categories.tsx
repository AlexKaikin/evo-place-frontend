'use client'

import { useRouter, useParams, usePathname } from 'next/navigation'
import { Aside } from '@/app/_elements'
import { useLangs } from '@store'
import { Menu, Stack, Widget } from '@ui'

export function Categories() {
  const router = useRouter()
  const pathname = usePathname()
  const { lang, translate } = useLangs()
  const params = useParams<{ category?: string }>()
  const category = params?.category || null
  const notCatalog = ['cart', 'compare', 'favorites']
  const isNotCatalog = notCatalog.some(el => pathname.split('/').includes(el))
  const changeCategory = (category: string | null) => {
    category ? router.push(`/shop/${category}`) : router.push(`/shop`)
  }

  if (isNotCatalog) return null

  return (
    <Aside>
      <Widget title={translate[lang].shop.categories} icon="BsGrid">
        <Stack gap={5}>
          <Menu
            label="All"
            variant="category"
            action={() => changeCategory(null)}
            active={category === null}
          />
          <Menu
            label="Tea"
            variant="category"
            action={() => changeCategory('tea')}
            active={category === 'tea'}
          />
          <Menu
            label="Coffee"
            variant="category"
            action={() => changeCategory('coffee')}
            active={category === 'coffee'}
          />
          <Menu
            label="Spices"
            variant="category"
            action={() => changeCategory('spices')}
            active={category === 'spices'}
          />
          <Menu
            label="Seeds"
            variant="category"
            action={() => changeCategory('seeds')}
            active={category === 'seeds'}
          />
        </Stack>
      </Widget>
    </Aside>
  )
}
