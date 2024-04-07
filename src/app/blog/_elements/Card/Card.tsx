import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types/blog'
import { Icon, Stack, Typography } from '@ui'
import styles from './Card.module.css'

export function Card({ post }: { post: Post }) {
  const { _id, title, imgUrl, category, viewsCount, created, text } = post

  return (
    <Link
      href={`/blog/${category.toLowerCase()}/${_id}`}
      className={styles.card}
    >
      <div className={styles.imgContainer}>
        <Image
          src={imgUrl}
          alt={title}
          className={styles.img}
          sizes="(max-width: 1800px) 50vw"
          fill
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Typography
            variant="title-4"
            tag="h2"
            style={{ marginBottom: '0px' }}
          >
            {title}
          </Typography>
        </div>
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

        <div className={styles.info}>
          {text
            .slice(0, 140)
            .concat('...')
            .split('\n')
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>
      </div>
    </Link>
  )
}
