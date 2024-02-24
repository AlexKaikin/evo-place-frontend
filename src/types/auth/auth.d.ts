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
  password: string
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

export type Register = Pick<User, 'fullName' | 'email' | 'password'>

export type Login = Pick<User, 'email' | 'password'>

export type UserResponse = {
  accessToken: string
  refreshToken: string
  user: User
}

export type Pagination = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}
