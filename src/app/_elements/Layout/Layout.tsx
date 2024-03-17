import { ReactNode } from 'react'
import { Footer, Header, Main } from '..'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
