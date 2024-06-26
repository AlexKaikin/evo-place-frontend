import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Aside } from '@app/_elements'
import { SAIT_URL } from '@configs'
import { AutorizedGuard } from '@hocs'
import { Categories, MobileMenu } from './_elements'

export const metadata: Metadata = {
  title: 'Club | EVO PLACE',
  description: 'Club...',
  metadataBase: new URL(SAIT_URL),
  alternates: { canonical: '/club' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Club | EVO PLACE',
    description: 'Club...',
    url: SAIT_URL,
    siteName: 'EVO PLACE',
    type: 'website',
  },
}

export default function ClubLayout({ children }: { children: ReactNode }) {
  return (
    <AutorizedGuard>
      <Aside hideInMobile>
        <Categories />
      </Aside>
      {children}
      <MobileMenu />
    </AutorizedGuard>
  )
}
