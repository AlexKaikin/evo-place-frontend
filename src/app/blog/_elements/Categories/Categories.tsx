'use client'

import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { Menu, Stack, Widget } from '@ui'
import { scrollToTop } from '@utils'

export function Categories() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ postId?: string }>()
  const currentCategory = searchParams.get('category')

  const changeCategory = (category: string | null) => {
    category ? router.push(`/blog?category=${category}`) : router.push(`/blog`)
    scrollToTop()
  }

  return (
    <Widget title="Categories" icon="BsGrid">
      <Stack gap={10}>
        <Menu
          label="All"
          variant="category"
          action={() => changeCategory(null)}
          active={currentCategory === null && !params?.postId ? true : false}
        />
        <Menu
          label="Reviews"
          variant="category"
          action={() => changeCategory('Reviews')}
          active={currentCategory === 'Reviews' ? true : false}
        />
        <Menu
          label="Traditions"
          variant="category"
          action={() => changeCategory('Traditions')}
          active={currentCategory === 'Traditions' ? true : false}
        />
        <Menu
          label="Instructions"
          variant="category"
          action={() => changeCategory('Instructions')}
          active={currentCategory === 'Instructions' ? true : false}
        />
      </Stack>
    </Widget>
  )
}
