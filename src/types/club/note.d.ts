export type Note = {
  _id: string
  id: number
  galleryUrl: string[]
  text: string
  tags: string[]
  published: boolean
  user: {
    _id: string
    fullName: string
    avatarUrl: string | null
    email: string
    role: string
    createdAt: string
    updatedAt: string
    __v: number
    token?: string
  }
  group?: {
    _id: string
    title: string
    avatarUrl: string | null
  }
  created?: string
}

export type CreateNote = {
  _id?: string
  id: number
  galleryUrl: string[]
  text: string
  tags: string[]
  published: boolean
  user: sting | null
  group: string | null
  created: string
}

export type Pagination = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}
