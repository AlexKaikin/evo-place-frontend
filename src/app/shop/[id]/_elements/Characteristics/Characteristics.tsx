import { Product } from '@/types/shop'
import { Typography } from '@ui'
import styles from './Characteristics.module.css'

export function Characteristics({ product }: { product: Product }) {
  return (
    <div className={styles.characteristics}>
      <Typography variant="title-3">Characteristics</Typography>
      <div className={styles.items}>
        <div className={styles.item}>
          <div>Manufacturer: </div>
          <div className={styles.divider}></div>
          <div>{product.manufacturer}</div>
        </div>
        {product.property.country && (
          <div className={styles.item}>
            <div>Country: </div>
            <div className={styles.divider}></div>
            <div>{product.property.country}</div>
          </div>
        )}
        {product.property.town && (
          <div className={styles.item}>
            <div>City: </div>
            <div className={styles.divider}></div>
            <div>{product.property.town}</div>
          </div>
        )}
        {product.property.year && (
          <div className={styles.item}>
            <div>Year: </div>
            <div className={styles.divider}></div>
            <div>{product.property.year}</div>
          </div>
        )}
      </div>
    </div>
  )
}
