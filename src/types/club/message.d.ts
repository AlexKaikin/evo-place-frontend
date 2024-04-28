export type Message = {
  _id: string
  id: number
  user: {
    _id: string
    id: number
    fullName: string
    avatarUrl: string
  }
  text: string
  date: number
  socketID: string
}

export type NewMessage = Omit<Message, 'user' | '_id'> & { user: string }
