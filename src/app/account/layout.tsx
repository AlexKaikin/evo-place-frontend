import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Aside } from '@app/_elements'
import { SAIT_URL } from '@configs'
import { AutorizedGuard } from '@hocs'
import { Categories, MobileMenu } from './_elements'

export const metadata: Metadata = {
  title: 'Account | EVO PLACE',
  description: 'Account...',
  metadataBase: new URL(SAIT_URL),
  alternates: { canonical: '/account' },
  openGraph: {
    title: 'Account | EVO PLACE',
    description: 'Account...',
    url: SAIT_URL,
    siteName: 'EVO PLACE',
    type: 'website',
  },
}

export default function AccountLayout({ children }: { children: ReactNode }) {
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
