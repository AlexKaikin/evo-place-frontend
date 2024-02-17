export type Register = {
  fullName: string
  email: string
  password: string
}

export type Login = {
  email: string
  password: string
}

export type User = {
  _id: string
  id: number
  fullName: string
  about: string
  interests: string[]
  location: string
  private: boolean
  avatarUrl: string
  subscribers: SubscriptionsUser[]
  subscriptionsUser: SubscriptionsUser[]
  subscriptionsGroup: SubscriptionsGroup[]
  email: string
  role: string
  createdAt: string
  updatedAt: string
  __v: number
  token?: string
}

type SubscriptionsUser = {
  _id: string
  id: number
  fullName: string
  avatarUrl: string
}

type SubscriptionsGroup = {
  _id: string
  id: number
  title: string
  avatarUrl: string
}

export type UserResponse = {
  accessToken: string
  refreshToken: string
  user: User
}
