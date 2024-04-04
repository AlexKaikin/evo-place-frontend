import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Typography } from '@ui'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Favorite products |  EVO PLACE',
  description: 'Products...',
}

export default function ShopFavoritesLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className={styles.container}>
      <Typography variant="title-3" tag="h1">
        Favorite products
      </Typography>
      {children}
    </div>
  )
}
