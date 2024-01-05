import { ReactNode } from 'react'
import { Aside } from '@app/_elements'
import { Categories } from './_elements'

//import styles from './page.module.css'

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Aside>
        <Categories />
      </Aside>
      {children}
    </>
  )
}
