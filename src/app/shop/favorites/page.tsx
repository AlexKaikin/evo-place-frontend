'use client'

import cn from 'classnames'
import { useFavoriteProducts } from '@store'
import { Card } from '../_elements'
import styles from './page.module.css'

export default function Favorites() {
  const { favoritesItems } = useFavoriteProducts()

  if (!favoritesItems.length) return <div>Empty</div>

  return (
    <div className={cn(styles.products, styles.content)}>
      {favoritesItems?.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  )
}
