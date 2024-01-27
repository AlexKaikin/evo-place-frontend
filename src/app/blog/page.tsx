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

async function getPopPosts(urlParams: UrlParams) {
  const res = await postService.getAll(urlParams)
  return res.data
}

export default async function Blog(urlParams: UrlParams) {
  const postsData = await getPosts(urlParams)
  urlParams.searchParams.category = ''
  const popPostsData = await getPopPosts(urlParams)
  const [{ posts, totalCount }, popPosts] = await Promise.all([
    postsData,
    popPostsData,
  ])

  if (!posts.length)
    return (
      <>
        <div className={styles.container}>
          <Typography
            variant="title-3"
            tag="h2"
            style={{ marginBottom: '0px' }}
          >
            No posts found
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

      <Aside position="right" width={400}>
        <Popular posts={popPosts} />
      </Aside>
    </>
  )
}
