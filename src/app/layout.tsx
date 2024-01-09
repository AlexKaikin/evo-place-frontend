import { ReactNode } from 'react'
import { ToastContainer, Slide } from 'react-toastify'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Footer, Header, Main } from '@app/_elements'
import '@assets/styles/globals.css'

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
        <Header />
        <Main>{children}</Main>
        <Footer />
        <ToastContainer theme="colored" transition={Slide} />
      </body>
    </html>
  )
}
