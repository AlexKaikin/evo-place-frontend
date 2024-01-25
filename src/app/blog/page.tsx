import cn from 'classnames'
import { Aside } from '@app/_elements'
import { postService } from '@services'
import { Pagination, Typography } from '@ui'
import type { UrlParams } from '@utils'
import { Card, Popular } from './_elements'
import styles from './page.module.css'

async function getPosts(urlParams: UrlParams) {
  const res = await postService.getAll(urlParams)
  const posts = res.data
  const totalCount = res.headers['x-total-count']
  return { posts, totalCount }
}

export default async function Blog(urlParams: UrlParams) {
  const { posts, totalCount } = await getPosts(urlParams)

  if (!posts.length)
    return (
      <>
        <div className={styles.container}>
          <Typography
            variant="title-3"
            tag="h2"
            style={{ marginBottom: '0px' }}
          >
            No products found
          </Typography>
        </div>
        <Aside position="right" width={250} hideInMobile>
          Aside
        </Aside>
      </>
    )

  return (
    <>
      <div className={styles.container}>
        <div className={cn(styles.posts, styles.content)}>
          {posts.map(post => (
            <Card key={post._id} post={post} />
          ))}
        </div>
        <Pagination totalCount={totalCount} />
      </div>

      <Aside position="right" width={350}>
        <Popular posts={posts} />
      </Aside>
    </>
  )
}
