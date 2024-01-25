export type Post = {
  _id: string
  id: number
  title: string
  imgUrl: string
  galleryUrl: string[]
  category: string
  viewsCount?: number
  text: string
  published: boolean
  created?: string
}
