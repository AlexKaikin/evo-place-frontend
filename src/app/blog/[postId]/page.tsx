import dayjs from 'dayjs'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Post } from '@/types/blog'
import { Aside } from '@app/_elements'
import { postService, commentService } from '@services'
import { Icon, Stack, Typography } from '@ui'
import { UrlParams, text } from '@utils'
import { Comments, Popular, Favorite } from './_elements'
import styles from './page.module.css'

export async function generateMetadata({ params }: UrlParams) {
  const post: Post = await getPost(params.postId)

  return {
    title: post.title + ` |  EVO PLACE`,
    description: text.getMetaDescription(post.text),
  }
}

async function getPost(postId: string) {
  const res = await postService.getOne(postId)
  if (res.status !== 200) return notFound()
  return res.data
}

async function getComments(postId: string) {
  const res = await commentService.getAll(postId)
  if (res.status !== 200) return notFound()
  return res.data
}

async function getPopPosts(urlParams: UrlParams) {
  const res = await postService.getAll(urlParams)
  return res.data
}

export default async function Product(urlParams: UrlParams) {
  const postsData = await getPost(urlParams.params.postId)
  const commentsData = await getComments(urlParams.params.postId)
  //   urlParams.searchParams.category = post.category
  const popPostsData = await getPopPosts(urlParams)
  const [post, comments, popPosts] = await Promise.all([
    postsData,
    commentsData,
    popPostsData,
  ])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Typography variant="title-1" tag="h1">
            {post.title}
          </Typography>
          <Stack direction="row" gap={20}>
            <div className={styles.meta}>
              <Stack direction="row" alignItems="center" gap={5}>
                <Icon name="BsFolder2Open" size="16" /> {post.category}
              </Stack>
              <Stack direction="row" alignItems="center" gap={5}>
                <Icon name="BsEye" size="16" /> {post.viewsCount}
              </Stack>
              <Stack direction="row" alignItems="center" gap={5}>
                <Icon name="BsClock" size="16" />{' '}
                {dayjs(post.created).format('H:m, DD.MM.YYYY')}
              </Stack>
            </div>
            <Stack direction="row" alignItems="center" gap={5}>
              <Favorite post={post} />
            </Stack>
          </Stack>
          {post.imgUrl ? (
            <div className={styles.imgContainer}>
              <Image
                fill
                sizes="(max-width: 1800px) 50vw"
                src={post.imgUrl}
                alt={post.title}
              />
            </div>
          ) : null}
          <div>
            {post.text.split('\n').map((item, i) => (
              <Typography key={i} variant="text" tag="p">
                {item}
              </Typography>
            ))}
          </div>
          <Comments postId={post._id} comments={comments} />
        </div>
      </div>

      <Aside position="right" width={400}>
        <Popular posts={popPosts} />
      </Aside>
    </>
  )
}
