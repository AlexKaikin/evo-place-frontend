import { notFound } from 'next/navigation'
import { Aside } from '@/app/_elements'
import { recommendationService, userService } from '@services'
import { UrlParams, text } from '@utils'
import { Profile, Notes, Recommendations } from '../../_elements'
import styles from './page.module.css'

export async function generateMetadata({ params }: UrlParams) {
  const user = await getUser(params!.id!)

  return {
    title: user.fullName + ` |  EVO PLACE`,
    description: text.getMetaDescription(user.about),
  }
}

async function getUser(id: string) {
  const res = await userService.getOne(id)
  if (res.status !== 200) return notFound()

  return res.data
}

async function getRecommendations() {
  const res = await recommendationService.getAll()
  const recommendations = res.data
  return { recommendations }
}

export default async function Page(urlParams: UrlParams) {
  const user = await getUser(urlParams.params!.id!)
  const { recommendations } = await getRecommendations()

  return (
    <>
      <div className={styles.page}>
        <div className={styles.content}>
          <Profile user={user} />
          <Notes user={user} />
        </div>
      </div>
      <Aside position="right" width={300}>
        <Recommendations recommendItems={recommendations} />
      </Aside>
    </>
  )
}
