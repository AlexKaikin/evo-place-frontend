'use client'

import { Product } from '@/types/shop'
import { useLangs } from '@store'
import { Typography } from '@ui'
import styles from './Description.module.css'

export function Description({ product }: { product: Product }) {
  const { lang, translate } = useLangs()

  return (
    <div className={styles.description}>
      <Typography variant="title3">
        {translate[lang].shop.product.description}
      </Typography>
      {product.text.split('\n').map((item, i) => (
        <Typography key={i} variant="text" tag="p">
          {item}
        </Typography>
      ))}
    </div>
  )
}
