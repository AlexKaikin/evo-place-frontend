import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Aside } from '@app/_elements'
import { SAIT_URL } from '@configs'
import { Categories, MobileMenu, Sidebar } from './_elements'

export const metadata: Metadata = {
  title: 'Shop | EVO PLACE',
  description: 'Products...',
  metadataBase: new URL(SAIT_URL),
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop | EVO PLACE',
    description: 'Products...',
    url: SAIT_URL,
    siteName: 'EVO PLACE',
    type: 'website',
  },
}

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Aside>
        <Categories />
      </Aside>
      {children}
      <Sidebar />
      <MobileMenu />
    </>
  )
}
