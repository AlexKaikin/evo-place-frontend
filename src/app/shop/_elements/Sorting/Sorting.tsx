'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Icon, Menu, MenuItem, Widget } from '@ui'
import { scrollToTop } from '@utils'
import styles from './Sorting.module.css'

export function Sorting() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function getSortActive() {
    const _sort = searchParams.get('_sort')
    const _order = searchParams.get('_order')

    if (_sort === 'price' && _order === 'desc') return 'price desc'
    else if (_sort === 'price' && _order === 'asc') return 'price asc'
    else if (_sort === 'rating' && _order === 'desc') return 'pop'
    else return 'new'
  }

  function changeSortActive(item: string) {
    let queryParams
    let _sort = ''
    let _order = ''

    if (item === 'priceDecrease') {
      _sort = 'price'
      _order = 'desc'
    } else if (item === 'priceIncrease') {
      _sort = 'price'
      _order = 'asc'
    } else if (item === 'pop') {
      _sort = 'rating'
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
    const path = window.location.pathname + '?' + queryParams?.toString()
    router.push(path)
    scrollToTop()
  }

  return (
    <Widget>
      <div className={styles.sort}>
        <Icon name="BsSortDown" />
        <div className={styles.title}>
          Sorting:{' '}
          <Menu label={getSortActive()} color="primary">
            <MenuItem label="new" onClick={() => changeSortActive('new')} />
            <MenuItem label="pop" onClick={() => changeSortActive('pop')} />
            <MenuItem
              label="price asc"
              onClick={() => changeSortActive('priceIncrease')}
            />
            <MenuItem
              label="price desc"
              onClick={() => changeSortActive('priceDecrease')}
            />
          </Menu>
        </div>
      </div>
    </Widget>
  )
}
