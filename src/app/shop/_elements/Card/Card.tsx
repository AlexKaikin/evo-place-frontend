import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/shop'
import { Stack, Typography, Rating } from '@ui'
import styles from './Card.module.css'

export function Card({ product }: { product: Product }) {
  const {
    _id,
    title,
    price,
    rating,
    ratingCount,
    imgUrl,
    manufacturer,
    id,
    category,
  } = product
  const newProduct = dayjs(new Date()).diff(dayjs(id), 'month') < 40
  const popProduct = ratingCount > 1

  return (
    <Link
      href={`/shop/${category.toLowerCase()}/${_id}`}
      className={styles.card}
    >
      <div className={styles.labels}>
        {newProduct && <div className={styles.new}>new</div>}
        {popProduct && <div className={styles.pop}>pop</div>}
      </div>
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
          <Typography variant="title6" tag="h2" style={{ marginBottom: '0px' }}>
            {title}
          </Typography>
          <Typography variant="subtitle" className={styles.manufacturer}>
            {manufacturer}
          </Typography>
        </div>
        <div className={styles.info}>
          <div className={styles.price}>${price}</div>
          {rating > 0 ? (
            <Stack
              direction="row"
              alignItems="center"
              gap={5}
              className={styles.rating}
            >
              <Rating value={rating} />({ratingCount})
            </Stack>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
