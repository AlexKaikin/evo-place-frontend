'use client'

import { useRouter, useParams } from 'next/navigation'
import { useFavoritePosts } from '@store'
import { Menu, Icon, MenuItem, Badge, IconButton } from '@ui'
import { scrollToTop } from '@utils'
import styles from './MobileMenu.module.css'

export function MobileMenu() {
  const router = useRouter()
  const params = useParams<{ category?: string }>()
  const category = params?.category || null
  const favoritesStore = useFavoritePosts()

  if (!favoritesStore)
    return (
      <div className={styles.mobileMenu}>
        <IconButton icon="BsGrid" />
        <IconButton icon="BsSortDown" />
        <IconButton icon="BsBookmark" />
      </div>
    )

  const { favoritesItems } = favoritesStore

  const changeCategory = (category: string | null) => {
    category ? router.push(`/blog/${category}`) : router.push(`/blog`)
    scrollToTop()
  }

  function changeSortActive(item: string) {
    let queryParams
    let _sort = ''
    let _order = ''

    if (item === 'viewsCount') {
      _sort = 'viewsCount'
      _order = 'desc'
    } else {
      _sort = 'id'
      _order = 'desc'
    }

    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)

      if (queryParams.has('_sort')) {
        queryParams.set('_sort', _sort)
        queryParams.set('_order', _order)
      } else {
        queryParams.append('_sort', _sort)
        queryParams.append('_order', _order)
      }

      if (queryParams.has('_page')) {
        queryParams.set('_page', String(1))
      }
    }

    const path = '/blog' + '?' + queryParams?.toString()
    router.push(path)
    scrollToTop()
  }

  return (
    <div className={styles.mobileMenu}>
      <Menu label={<Icon name="BsGrid" />}>
        <MenuItem
          label="All"
          action={() => changeCategory(null)}
          color={category === null ? 'primary' : 'secondary'}
        />
        <MenuItem
          label="Reviews"
          action={() => changeCategory('reviews')}
          color={category === 'reviews' ? 'primary' : 'secondary'}
        />
        <MenuItem
          label="Traditions"
          action={() => changeCategory('traditions')}
          color={category === 'traditions' ? 'primary' : 'secondary'}
        />
        <MenuItem
          label="Instructions"
          action={() => changeCategory('instructions')}
          color={category === 'instructions' ? 'primary' : 'secondary'}
        />
      </Menu>
      <Menu label={<Icon name="BsSortDown" />}>
        <MenuItem label="new" onClick={() => changeSortActive('id')} />
        <MenuItem label="pop" onClick={() => changeSortActive('viewsCount')} />
      </Menu>

      <Badge
        value={favoritesItems.length}
        onClick={() =>
          favoritesItems.length ? router.push('/blog/favorites') : null
        }
      >
        <IconButton icon="BsBookmark" />
      </Badge>
    </div>
  )
}
