import { notFound } from 'next/navigation'
import { Aside } from '@/app/_elements'
import { recommendationService, groupService } from '@services'
import { UrlParams, text } from '@utils'
import { CreateNote, Notes, Recommendations } from '../../_elements'
import { Profile } from './_elements'
import styles from './page.module.css'

export async function generateMetadata({ params }: UrlParams) {
  const group = await getGroup(params!.id!)

  return {
    title: group.title + ` |  EVO PLACE`,
    description: text.getMetaDescription(group.about),
  }
}

async function getGroup(id: string) {
  const res = await groupService.getOne(id)
  if (res.status !== 200) return notFound()

  return res.data
}

async function getRecommendations() {
  const res = await recommendationService.getAll()
  const recommendations = res.data
  return { recommendations }
}

export default async function Page(urlParams: UrlParams) {
  const group = await getGroup(urlParams.params!.id!)
  const { recommendations } = await getRecommendations()

  return (
    <>
      <div className={styles.page}>
        <div className={styles.content}>
          <Profile group={group} />
          <CreateNote by={group} />
          <Notes group={group} />
        </div>
      </div>
      <Aside position="right" width={300}>
        <Recommendations recommendItems={recommendations} />
      </Aside>
    </>
  )
}
