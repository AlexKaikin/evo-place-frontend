'use client'

import cn from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import { IconButton } from '@ui'
import styles from './Pagination.module.css'

type Props = { totalCount: string }

export function Pagination({ totalCount }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = getCurrentPage()
  const limitItems = 8
  const pagesCount = Math.ceil(+totalCount / limitItems)
  const pages: number[] = createPages(pagesCount, currentPage)
  const prevPage = currentPage > 1 ? currentPage - 1 : 1
  const nextPage = currentPage < pages.length ? currentPage + 1 : pages.length

  function getCurrentPage() {
    return searchParams.get('_page') !== null
      ? Number(searchParams.get('_page'))
      : 1
  }

  function createPages(pagesCount: number, currentPage: number) {
    const pages = []
    if (pagesCount > 5) {
      if (currentPage > 4) {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i)
          if (i === pagesCount) break
        }
      } else {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
          if (i === pagesCount) break
        }
      }
    } else {
      for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  function changePage(number: number) {
    let queryParams
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)
      if (queryParams.has('_page')) {
        queryParams.set('_page', String(number))
        queryParams.set('_limit', String(limitItems))
      } else {
        queryParams.append('_page', String(number))
        queryParams.append('_limit', String(limitItems))
      }
    }
    const path = window.location.pathname + '?' + queryParams?.toString()
    router.push(path)
  }

  if (pages.length === 1) return null

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <IconButton
          icon="BsChevronLeft"
          onClick={() => changePage(prevPage)}
          className={styles.page}
          size="17"
        />
      )}
      {pages?.map(page => (
        <button
          key={page}
          onClick={() => currentPage !== page && changePage(page)}
          className={cn(styles.page, { [styles.active]: currentPage === page })}
        >
          {page}
        </button>
      ))}
      {currentPage < pagesCount && (
        <IconButton
          icon="BsChevronRight"
          onClick={() => changePage(nextPage)}
          className={styles.page}
          size="17"
        />
      )}
    </div>
  )
}
