export type Message = {
  id: number
  user: {
    id: number
    fullName: string
    avatarUrl: string
  }
  text: string
  date: number
  socketID: string
}

export type NewMessage = Omit<Message, 'user'> & { user: string }
