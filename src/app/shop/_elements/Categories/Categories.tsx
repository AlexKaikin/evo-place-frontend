'use client'

import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { Menu, Stack, Widget } from '@ui'
import { scrollToTop } from '@utils'

export function Categories() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ productId?: string }>()
  const currentCategory = searchParams.get('category')

  const changeCategory = (category: string | null) => {
    category ? router.push(`/shop?category=${category}`) : router.push(`/shop`)
    scrollToTop()
  }

  return (
    <Widget title="Categories" icon="BsGrid">
      <Stack gap={5}>
        <Menu
          label="All"
          variant="category"
          action={() => changeCategory(null)}
          active={currentCategory === null && !params?.productId ? true : false}
        />
        <Menu
          label="Tea"
          variant="category"
          action={() => changeCategory('Tea')}
          active={currentCategory === 'Tea' ? true : false}
        />
        <Menu
          label="Coffee"
          variant="category"
          action={() => changeCategory('Coffee')}
          active={currentCategory === 'Coffee' ? true : false}
        />
        <Menu
          label="Spices"
          variant="category"
          action={() => changeCategory('Spices')}
          active={currentCategory === 'Spices' ? true : false}
        />
        <Menu
          label="Seeds"
          variant="category"
          action={() => changeCategory('Seeds')}
          active={currentCategory === 'Seeds' ? true : false}
        />
      </Stack>
    </Widget>
  )
}
