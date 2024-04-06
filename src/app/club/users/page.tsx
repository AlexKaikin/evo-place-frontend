import { Metadata } from 'next'
import { Aside } from '@app/_elements'
import { SAIT_URL } from '@configs'
import { Recommendations } from '../_elements'
import { Search, Users } from './_elements'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Users | EVO PLACE',
  description: 'Users...',
  metadataBase: new URL(SAIT_URL),
  alternates: { canonical: '/club/users' },
  openGraph: {
    title: 'Users | EVO PLACE',
    description: 'Users...',
    url: SAIT_URL,
    siteName: 'EVO PLACE',
    type: 'website',
  },
}

export default async function Page() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.content}>
          <Search />
          <Users />
        </div>
      </div>
      <Aside position="right" width={300}>
        <Recommendations />
      </Aside>
    </>
  )
}
