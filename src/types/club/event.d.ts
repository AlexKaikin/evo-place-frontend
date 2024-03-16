import { Group } from '.'
import { User } from '../auth'

export type Event = {
  _id: string
  id: number
  galleryUrl: string[]
  text: string
  tags: string[]
  published: boolean
  user?: User
  group: Group
  created: string
}
