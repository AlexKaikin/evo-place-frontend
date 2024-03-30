'use client'

import { Product } from '@/types/shop'
import { useLangs } from '@store'
import { Typography } from '@ui'
import styles from './Characteristics.module.css'

export function Characteristics({ product }: { product: Product }) {
  const { lang, translate } = useLangs()

  return (
    <div className={styles.characteristics}>
      <Typography variant="title-3">
        {translate[lang].shop.product.characteristics}
      </Typography>
      <div className={styles.items}>
        <div className={styles.item}>
          <div>{translate[lang].shop.product.manufacturer}: </div>
          <div className={styles.divider}></div>
          <div>{product.manufacturer}</div>
        </div>
        {product.property.country && (
          <div className={styles.item}>
            <div>{translate[lang].shop.product.country}: </div>
            <div className={styles.divider}></div>
            <div>{product.property.country}</div>
          </div>
        )}
        {product.property.town && (
          <div className={styles.item}>
            <div>{translate[lang].shop.product.city}: </div>
            <div className={styles.divider}></div>
            <div>{product.property.town}</div>
          </div>
        )}
        {product.property.year && (
          <div className={styles.item}>
            <div>{translate[lang].shop.product.year}: </div>
            <div className={styles.divider}></div>
            <div>{product.property.year}</div>
          </div>
        )}
      </div>
    </div>
  )
}
