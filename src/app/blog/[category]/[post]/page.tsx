import dayjs from 'dayjs'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Post } from '@/types/blog'
import { Aside } from '@app/_elements'
import { postService, commentService } from '@services'
import { Icon, Stack, Typography } from '@ui'
import { UrlParams, text } from '@utils'
import { Popular } from '../../_elements'
import { Comments, Favorite } from './_elements'
import styles from './page.module.css'

export async function generateMetadata(urlParams: UrlParams) {
  urlParams.searchParams._limit = '5'
  const post: Post = await getPost(urlParams.params!.post!)
  return {
    title: post.title + ` |  EVO PLACE`,
    description: text.getMetaDescription(post.text),
  }
}

async function getPost(postId: string) {
  const response = await postService.getOne(postId)
  if (response.status !== 200) return notFound()
  return response.post
}

async function getComments(postId: string) {
  const res = await commentService.getAll(postId)
  if (res.status !== 200) return notFound()
  return res.data
}

async function getPopPosts(urlParams: UrlParams) {
  return await postService.getAll(urlParams)
}

export default async function Product(urlParams: UrlParams) {
  if (urlParams.params?.category)
    urlParams.searchParams.category = urlParams.params.category
  const postsData = await getPost(urlParams.params!.post!)
  const commentsData = await getComments(urlParams.params!.post!)
  const popPostsData = await getPopPosts(urlParams)
  const [post, comments, popPosts] = await Promise.all([
    postsData,
    commentsData,
    popPostsData,
  ])
  const { _id, title, category, viewsCount, created, imgUrl, text } = post

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Typography variant="title-1" tag="h1">
            {title}
          </Typography>
          <Stack direction="row" gap={20}>
            <div className={styles.meta}>
              <Stack direction="row" alignItems="center" gap={5}>
                <Icon name="BsFolder2Open" size="16" /> {category}
              </Stack>
              <Stack direction="row" alignItems="center" gap={5}>
                <Icon name="BsEye" size="16" /> {viewsCount}
              </Stack>
              <Stack direction="row" alignItems="center" gap={5}>
                <Icon name="BsClock" size="16" />{' '}
                {dayjs(created).format('H:mm, DD.MM.YYYY')}
              </Stack>
            </div>
            <Stack direction="row" alignItems="center" gap={5}>
              <Favorite post={post} />
            </Stack>
          </Stack>
          {imgUrl && (
            <div className={styles.imgContainer}>
              <Image
                fill
                sizes="(max-width: 1800px) 50vw"
                src={imgUrl}
                alt={title}
              />
            </div>
          )}
          <div>
            {text.split('\n').map((item, i) => (
              <Typography key={i} variant="text" tag="p">
                {item}
              </Typography>
            ))}
          </div>
          <Comments postId={_id} comments={comments} />
        </div>
      </div>

      <Aside position="right" width={400}>
        <Popular posts={popPosts.posts} />
      </Aside>
    </>
  )
}
