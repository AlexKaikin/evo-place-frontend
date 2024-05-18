import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Typography } from '@ui'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Compare products |  EVO PLACE',
  description: 'Products...',
}

export default function ShopCompareLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className={styles.container}>
      <Typography variant="title3" tag="h1">
        Products for comparison
      </Typography>
      {children}
    </div>
  )
}
