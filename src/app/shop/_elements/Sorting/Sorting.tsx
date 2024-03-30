'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useLangs } from '@/store'
import { Icon, Menu, MenuItem, Widget } from '@ui'
import { scrollToTop } from '@utils'
import styles from './Sorting.module.css'

export function Sorting() {
  const router = useRouter()
  const { lang, translate } = useLangs()
  const searchParams = useSearchParams()

  function getSortActive() {
    const _sort = searchParams.get('_sort')
    const _order = searchParams.get('_order')

    if (_sort === 'price' && _order === 'desc')
      return translate[lang].shop.priceDesc
    else if (_sort === 'price' && _order === 'asc')
      return translate[lang].shop.priceAsc
    else if (_sort === 'rating' && _order === 'desc')
      return translate[lang].shop.pop
    else return translate[lang].shop.new
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
          {translate[lang].shop.sorting}:{' '}
          <Menu variant="text" label={getSortActive()} color="primary">
            <MenuItem
              label={translate[lang].shop.new}
              onClick={() => changeSortActive('new')}
            />
            <MenuItem
              label={translate[lang].shop.pop}
              onClick={() => changeSortActive('pop')}
            />
            <MenuItem
              label={translate[lang].shop.priceAsc}
              onClick={() => changeSortActive('priceIncrease')}
            />
            <MenuItem
              label={translate[lang].shop.priceDesc}
              onClick={() => changeSortActive('priceDecrease')}
            />
          </Menu>
        </div>
      </div>
    </Widget>
  )
}
