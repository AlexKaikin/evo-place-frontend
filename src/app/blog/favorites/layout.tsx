import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favorite posts |  EVO PLACE',
  description: 'Posts...',
}

export default function BlogFavoritesLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
