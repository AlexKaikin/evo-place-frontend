import { Metadata } from 'next'
import { Aside } from '@app/_elements'
import { SAIT_URL } from '@configs'
import { recommendationService } from '@services'
import { Recommendations } from '../_elements'
import { Groups, Search } from './_elements'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Groups | EVO PLACE',
  description: 'Groups...',
  metadataBase: new URL(SAIT_URL),
  alternates: { canonical: '/club/groups' },
  openGraph: {
    title: 'Groups | EVO PLACE',
    description: 'Groups...',
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
          <Search />
          <Groups />
        </div>
      </div>
      <Aside position="right" width={300}>
        <Recommendations recommendItems={recommendations} />
      </Aside>
    </>
  )
}
