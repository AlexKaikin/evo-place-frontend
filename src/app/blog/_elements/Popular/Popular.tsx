'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/types/blog'
import { useLangs } from '@store'
import { Icon, Stack, Typography, Widget } from '@ui'
import styles from './Popular.module.css'

export function Popular({ posts }: { posts: Post[] }) {
  const { lang, translate } = useLangs()
  return (
    <Widget title={translate[lang].blog.popular}>
      <Stack gap={20} className={styles.pop}>
        {posts.map(({ _id, title, category, viewsCount, imgUrl, created }) => (
          <Link
            href={`/blog/${category.toLowerCase()}/${_id}`}
            key={_id}
            className={styles.card}
          >
            <div className={styles.imgContainer}>
              <Image
                src={imgUrl}
                fill
                sizes="(max-width: 1800px) 33vw"
                alt="Картинка не загрузилась"
                className={styles.img}
              />
            </div>
            <div className={styles.content}>
              <Typography variant="title6" tag="h3">
                {title}
              </Typography>
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
            </div>
          </Link>
        ))}
      </Stack>
    </Widget>
  )
}
