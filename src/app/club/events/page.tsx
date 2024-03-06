import { Metadata } from 'next'
import { Aside } from '@app/_elements'
import { SAIT_URL } from '@configs'
import { recommendationService } from '@services'
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

async function getRecommendations() {
  const res = await recommendationService.getAll()
  const recommendations = res.data
  return { recommendations }
}

export default async function Page() {
  const { recommendations } = await getRecommendations()

  return (
    <>
      <div className={styles.page}>
        <div className={styles.content}>
          <Events />
        </div>
      </div>
      <Aside position="right" width={300}>
        <Recommendations recommendItems={recommendations} />
      </Aside>
    </>
  )
}
