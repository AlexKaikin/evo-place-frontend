import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favorite products |  EVO PLACE',
  description: 'Products...',
}

export default function ShopFavoritesLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
