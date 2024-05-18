import cn from 'classnames'
import { Aside } from '@app/_elements'
import { postService } from '@services'
import { Pagination, Typography } from '@ui'
import type { UrlParams } from '@utils'
import { Card, Popular } from '../_elements'
import styles from '../page.module.css'

async function getPosts(urlParams: UrlParams) {
  return await postService.getAll(urlParams)
}

async function getPopPosts(urlParams: UrlParams) {
  urlParams.searchParams._limit = '5'
  return await postService.getAll(urlParams)
}

export default async function Blog(urlParams: UrlParams) {
  if (urlParams.params?.category)
    urlParams.searchParams.category = urlParams.params.category
  const postsData = await getPosts(urlParams)
  const popPostsData = await getPopPosts(urlParams)
  const [{ posts, totalCount }, popPosts] = await Promise.all([
    postsData,
    popPostsData,
  ])

  if (!posts.length)
    return (
      <div className={styles.container}>
        <Typography variant="title3" tag="h2" style={{ marginBottom: '0px' }}>
          No posts found
        </Typography>
      </div>
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
        <Popular posts={popPosts.posts} />
      </Aside>
    </>
  )
}
