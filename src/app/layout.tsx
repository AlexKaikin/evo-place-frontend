import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Layout } from '@app/_elements'
import '@assets/styles/globals.css'
import { GTM } from '@configs'
import { Providers } from '@hocs'
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: 'EVO PLACE',
  description:
    'EVO community web application including an online store, blog and social network.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')

  return (
    <html lang="en" data-theme={theme?.value || 'light'}>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
      {GTM && <GoogleTagManager gtmId={GTM} />}
    </html>
  )
}
