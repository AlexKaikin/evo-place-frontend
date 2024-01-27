export type Comment = {
  _id: string
  id: number
  body: string
  published: string
  created: string
  updated: string
  post: {
    _id: string
    title: string
    id: number
  }
  user: {
    avatarUrl: string
    fullName: string
  }
}

export interface CreateComment {
  body: string
  post: string
}
