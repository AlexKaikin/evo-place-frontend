import { Metadata } from 'next'
import { accountReviewService } from '@services'
import { Pagination } from '@ui'
import type { UrlParams } from '@utils'
import { Reviews } from './_elements/Reviews/Reviews'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Reviews |  EVO PLACE',
  description: 'Reviews...',
}

async function getReviews(UrlParams: UrlParams) {
  const res = await accountReviewService.getAll(UrlParams)
  const reviews = res.data
  const totalCount = res.headers['x-total-count']
  return { reviews, totalCount }
}

export default async function Page(UrlParams: UrlParams) {
  const { reviews, totalCount } = await getReviews(UrlParams)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Reviews reviews={reviews} />
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  )
}
