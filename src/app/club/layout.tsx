import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Aside } from '@app/_elements'
import { SAIT_URL } from '@configs'
import { AutorizedGuard } from '@hocs'
import { Categories } from './_elements'

export const metadata: Metadata = {
  title: 'Club | EVO PLACE',
  description: 'Club...',
  metadataBase: new URL(SAIT_URL),
  alternates: { canonical: '/club' },
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
      <Aside>
        <Categories />
      </Aside>
      {children}
    </AutorizedGuard>
  )
}
