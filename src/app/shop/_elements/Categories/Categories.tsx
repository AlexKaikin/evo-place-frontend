'use client'

import { useRouter, useParams } from 'next/navigation'
import { useLangs } from '@store'
import { Menu, Stack, Widget } from '@ui'
import { scrollToTop } from '@utils'

export function Categories() {
  const router = useRouter()
  const { lang, translate } = useLangs()
  const params = useParams<{ category?: string }>()
  const category = params?.category || null
  const changeCategory = (category: string | null) => {
    category ? router.push(`/shop/${category}`) : router.push(`/shop`)
    scrollToTop()
  }

  return (
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
          action={() => changeCategory('Tea')}
          active={category === 'Tea'}
        />
        <Menu
          label="Coffee"
          variant="category"
          action={() => changeCategory('Coffee')}
          active={category === 'Coffee'}
        />
        <Menu
          label="Spices"
          variant="category"
          action={() => changeCategory('Spices')}
          active={category === 'Spices'}
        />
        <Menu
          label="Seeds"
          variant="category"
          action={() => changeCategory('Seeds')}
          active={category === 'Seeds'}
        />
      </Stack>
    </Widget>
  )
}
