export type Chat = {
  _id: string
  id: number
  users: {
    _id: string
    id: number
    fullName: string
    avatarUrl: string
  }[]
  lastMessage: string
  created: string
  updated: string
}
