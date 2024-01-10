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
          action={() => changeCategory('Чай')}
          color={currentCategory === 'Чай' ? 'primary' : 'secondary'}
        />
        <Menu
          label="Coffee"
          alignItems="flexStart"
          isWide
          action={() => changeCategory('Кофе')}
          color={currentCategory === 'Кофе' ? 'primary' : 'secondary'}
        />
        <Menu
          label="Spices"
          alignItems="flexStart"
          isWide
          action={() => changeCategory('Специи')}
          color={currentCategory === 'Специи' ? 'primary' : 'secondary'}
        />
        <Menu
          label="Seeds"
          alignItems="flexStart"
          isWide
          action={() => changeCategory('Семена')}
          color={currentCategory === 'Семена' ? 'primary' : 'secondary'}
        />
      </Stack>
    </Widget>
  )
}
