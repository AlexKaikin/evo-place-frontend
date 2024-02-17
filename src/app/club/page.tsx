import { recommendationService } from '@services'
import { Aside } from '../_elements'
import { CreateNote, Notes, Profile, Recommendations } from './_elements'
import styles from './page.module.css'

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
          <Profile />
          <CreateNote />
          <Notes />
        </div>
      </div>
      <Aside position="right" width={300}>
        <Recommendations recommendItems={recommendations} />
      </Aside>
    </>
  )
}
