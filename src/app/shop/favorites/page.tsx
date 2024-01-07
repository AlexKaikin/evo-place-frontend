'use client'

import cn from 'classnames'
import { useFavoritesStore } from '@store'
import { Typography } from '@ui'
import { Card } from '../_elements'
import styles from './page.module.css'

export default function Favorites() {
  const { favoritesItems } = useFavoritesStore()

  if (!favoritesItems.length)
    return (
      <div className={styles.container}>
        <Typography variant="title-3" tag="h1">
          Favorite products
        </Typography>
        <div>Empty</div>
      </div>
    )

  return (
    <div className={styles.container}>
      <Typography variant="title-3" tag="h1">
        Favorite products
      </Typography>
      <div className={cn(styles.products, styles.content)}>
        {favoritesItems?.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
