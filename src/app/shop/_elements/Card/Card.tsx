import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/shop'
import { Stack, Icon } from '@ui'
import styles from './Card.module.css'

type Props = {
  product: Product
}

export function Card({ product }: Props) {
  const { id, title, price, rating, ratingCount, imgUrl } = product

  return (
    <Link href={`/shop/${id}`} className={styles.card}>
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
        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          <div className={styles.price}>$ {price}</div>
          <Stack direction="row" alignItems="center" gap={5}>
            <Icon name="BsChatText" size="17" /> {ratingCount}
          </Stack>
          <Stack direction="row" alignItems="center" gap={5}>
            <Icon name="BsStarFill" size="17" /> {rating}
          </Stack>
        </div>
      </div>
    </Link>
  )
}
