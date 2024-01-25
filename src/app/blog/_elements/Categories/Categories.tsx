'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Menu, Stack, Widget } from '@ui'
import { scrollToTop } from '@utils'

export function Categories() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const changeCategory = (category: string) => {
    router.push(`/blog?category=${category}`)
    scrollToTop()
  }

  return (
    <Widget title="Categories" icon="BsGrid">
      <Stack gap={10}>
        <Menu
          label="Reviews"
          alignItems="flexStart"
          isWide
          action={() => changeCategory('Reviews')}
          color={currentCategory === 'Reviews' ? 'primary' : 'secondary'}
        />
        <Menu
          label="Traditions"
          alignItems="flexStart"
          isWide
          action={() => changeCategory('Traditions')}
          color={currentCategory === 'Traditions' ? 'primary' : 'secondary'}
        />
        <Menu
          label="Instructions"
          alignItems="flexStart"
          isWide
          action={() => changeCategory('Instructions')}
          color={currentCategory === 'Instructions' ? 'primary' : 'secondary'}
        />
      </Stack>
    </Widget>
  )
}
