export type Review = {
  _id: string
  id: number
  rating: number
  body: string
  published: string
  created: string
  updated: string
  product:
    | string
    | {
        _id: string
        title: string
        id: number
      }
}
