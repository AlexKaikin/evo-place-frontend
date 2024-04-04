export type Review = {
  _id: string
  id: number
  rating: number
  body: string
  published: string
  created: string
  updated: string
  product: {
    _id: string
    title: string
    id: number
    category: string
  }
  user: {
    avatarUrl: string
    fullName: string
  }
}

export type CreateReview = {
  rating: number
  body: string
  product: string
}
