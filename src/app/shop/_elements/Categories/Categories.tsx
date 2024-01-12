'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Menu, Stack, Widget } from '@ui'
import { scrollToTop } from '@utils'

export function Categories() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const changeCategory = (category: string) => {
    router.push(`/shop?category=${category}`)
    scrollToTop()
  }

  return (
    <Widget title="Categories" icon="BsGrid">
      <Stack gap={10}>
        <Menu
          label="Tea"
          alignItems="flexStart"
          isWide
          action={() => changeCategory('Tea')}
          color={currentCategory === 'Tea' ? 'primary' : 'secondary'}
        />
        <Menu
          label="Coffee"
          alignItems="flexStart"
          isWide
          action={() => changeCategory('Coffee')}
          color={currentCategory === 'Coffee' ? 'primary' : 'secondary'}
        />
        <Menu
          label="Spices"
          alignItems="flexStart"
          isWide
          action={() => changeCategory('Spices')}
          color={currentCategory === 'Spices' ? 'primary' : 'secondary'}
        />
        <Menu
          label="Seeds"
          alignItems="flexStart"
          isWide
          action={() => changeCategory('Seeds')}
          color={currentCategory === 'Seeds' ? 'primary' : 'secondary'}
        />
      </Stack>
    </Widget>
  )
}
