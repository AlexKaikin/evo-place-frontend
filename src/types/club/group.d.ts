export type Group = {
  _id: string
  id: number
  title: string
  about: string
  location: string
  private: boolean
  subscribers: SubscriptionsUserType[]
  avatarUrl: string | null
  creator: string
  createdAt: string
  __v?: number
}

type SubscriptionsUserType = {
  _id: string
  id: number
  fullName: string
  avatarUrl: string
}

export type Pagination = {
  pagesCount: number
  totalItems: number
  _limit: number
  _page: number
}
