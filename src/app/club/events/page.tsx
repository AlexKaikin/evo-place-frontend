import { Metadata } from 'next'
import { Aside } from '@app/_elements'
import { SAIT_URL } from '@configs'
import { Recommendations } from '../_elements'
import { Events } from './_elements'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Events | EVO PLACE',
  description: 'Events...',
  metadataBase: new URL(SAIT_URL),
  alternates: { canonical: '/club/events' },
  openGraph: {
    title: 'Events | EVO PLACE',
    description: 'Events...',
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
          <Events />
        </div>
      </div>
      <Aside position="right" width={300}>
        <Recommendations />
      </Aside>
    </>
  )
}
