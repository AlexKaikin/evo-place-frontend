import { Metadata } from 'next'
import { accountCommentService } from '@services'
import { Pagination } from '@ui'
import type { UrlParams } from '@utils'
import { Comments } from './_elements/Comments/Comments'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Comments |  EVO PLACE',
  description: 'Comments...',
}

async function getComments(UrlParams: UrlParams) {
  const res = await accountCommentService.getAll(UrlParams)
  const comments = res.data
  const totalCount = res.headers['x-total-count']
  return { comments, totalCount }
}

export default async function Page(UrlParams: UrlParams) {
  const { comments, totalCount } = await getComments(UrlParams)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Comments comments={comments} />
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  )
}
