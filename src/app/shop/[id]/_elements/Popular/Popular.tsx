'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types/shop/product'
import { useLangs } from '@store'
import { Rating, Stack, Typography, Widget } from '@ui'
import styles from './Popular.module.css'

type Props = {
  products: Product[]
}

export function Popular({ products }: Props) {
  const { lang, translate } = useLangs()

  return (
    <Widget title={translate[lang].shop.product.popular}>
      <Stack gap={20} className={styles.pop}>
        {products.splice(0, 5).map(product => (
          <Link
            href={`/shop/${product._id}`}
            key={product._id}
            className={styles.card}
          >
            <div className={styles.imgContainer}>
              <Image
                src={product.imgUrl}
                fill
                sizes="(max-width: 1800px) 33vw"
                alt="Картинка не загрузилась"
                className={styles.img}
              />
            </div>
            <div className={styles.content}>
              <Typography variant="title-6" tag="h3">
                {product.title}
              </Typography>

              <Stack direction="row" gap={20}>
                <div>$ {product.price}</div>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={5}
                  className={styles.rating}
                >
                  <Rating size={12} value={product.rating} /> (
                  {product.ratingCount})
                </Stack>
              </Stack>
            </div>
          </Link>
        ))}
      </Stack>
    </Widget>
  )
}
