'use client'

import { Product } from '@/types/shop'
import { useLangs } from '@store'
import styles from './Manufacturer.module.css'

export function Manufacturer({ product }: { product: Product }) {
  const { lang, translate } = useLangs()

  return (
    <div className={styles.manufacturer}>
      {translate[lang].shop.product.by} <span>{product.manufacturer}</span>
    </div>
  )
}
