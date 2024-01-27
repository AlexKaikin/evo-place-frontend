import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/shop'
import { Stack, Icon, Typography } from '@ui'
import styles from './Card.module.css'

export function Card({ product }: { product: Product }) {
  const { _id, title, price, rating, ratingCount, imgUrl, manufacturer } =
    product

  return (
    <Link href={`/shop/${_id}`} className={styles.card}>
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
            variant="title-6"
            tag="h2"
            style={{ marginBottom: '0px' }}
          >
            {title}
          </Typography>
          <Typography variant="subtitle" className={styles.manufacturer}>
            {manufacturer}
          </Typography>
        </div>
        <div className={styles.info}>
          <div className={styles.price}>${price}</div>
          <Stack
            direction="row"
            alignItems="center"
            gap={5}
            className={styles.reviews}
          >
            <Icon name="BsChatText" size="17" /> {ratingCount}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={5}
            className={styles.rating}
          >
            <Icon name="BsStarFill" size="17" /> {rating}
          </Stack>
        </div>
      </div>
    </Link>
  )
}
