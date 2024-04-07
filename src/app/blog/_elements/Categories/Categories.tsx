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
    category ? router.push(`/blog/${category}`) : router.push(`/blog`)
    scrollToTop()
  }

  return (
    <Widget title={translate[lang].blog.categories} icon="BsGrid">
      <Stack gap={10}>
        <Menu
          label="All"
          variant="category"
          action={() => changeCategory(null)}
          active={category === null}
        />
        <Menu
          label="Reviews"
          variant="category"
          action={() => changeCategory('reviews')}
          active={category === 'reviews'}
        />
        <Menu
          label="Traditions"
          variant="category"
          action={() => changeCategory('traditions')}
          active={category === 'traditions'}
        />
        <Menu
          label="Instructions"
          variant="category"
          action={() => changeCategory('instructions')}
          active={category === 'instructions'}
        />
      </Stack>
    </Widget>
  )
}
