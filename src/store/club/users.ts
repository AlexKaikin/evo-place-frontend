import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { create } from 'zustand'
import type { User, Pagination } from '@/types/auth'
import { userService } from '@services'
import { useAuth } from '..'

export type Users = {
  users: User[]
  user: User | null
  filter: { name: string }
  pagination: Pagination
  loading: boolean
  getUsers: () => void
  setUser: (data: User) => void
  getUsersMore: () => void
  setFilter: (name: string) => void
  follow: (id: User) => Promise<object | undefined>
  unFollow: (id: User) => Promise<object | undefined>
}

const paginationDefault = {
  pagesCount: 0,
  totalItems: 0,
  _limit: 60,
  _page: 1,
}

export const useUsers = create<Users>()((set, get) => ({
  users: [],
  user: null,
  filter: { name: '' },
  pagination: paginationDefault,
  loading: false,
  getUsers: async () => {
    try {
      set(() => ({ loading: true, users: [] }))
      const res = await userService.getAll(getUrlParams(get, {}))
      const users = res.data
      const halper = new userHalper(res, get)
      const pagination = halper.getPagination()
      set(() => ({ users, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  getUsersMore: async () => {
    try {
      set(() => ({
        loading: true,
        pagination: { ...get().pagination, _page: get().pagination._page + 1 },
      }))
      const res = await userService.getAll(getUrlParams(get))
      const halper = new userHalper(res, get, {})
      const pagination = halper.getPagination()
      const users = get().users
      users.push(...res.data)
      set(() => ({ users, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  setFilter: name => set(() => ({ filter: { name } })),
  follow: async user => {
    set(() => ({ loading: true }))
    try {
      const res = await userService.follow(user._id)
      const { setUser, user: currentUser } = useAuth.getState()
      const subscriptionsUser = [...currentUser!.subscriptionsUser]
      subscriptionsUser.push(user)
      setUser({ ...currentUser!, subscriptionsUser })

      user.subscribers.push(currentUser!)
      set(() => ({ loading: false, user }))

      return res.data
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  unFollow: async user => {
    set(() => ({ loading: true }))
    try {
      const res = await userService.unFollow(user._id)
      const { setUser, user: currentUser } = useAuth.getState()
      const subscriptionsUser = currentUser!.subscriptionsUser.filter(
        el => el._id !== user._id
      )
      user.subscribers = user.subscribers.filter(
        el => el._id !== currentUser!._id
      )

      setUser({ ...currentUser!, subscriptionsUser })
      set(() => ({ loading: false, user }))

      return res.data
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  setUser: async user => {
    set(() => ({ user }))
  },
}))

function getUrlParams(get: () => Users, pagi?: object) {
  const pagination = pagi ? paginationDefault : get().pagination

  return {
    searchParams: {
      _limit: String(pagination._limit),
      _page: String(pagination._page),
      q: get().filter.name,
    },
  }
}

export class userHalper {
  res: AxiosResponse<User[]>
  get: () => Users
  pagination: Pagination

  constructor(res: AxiosResponse<User[]>, get: () => Users, more?: object) {
    this.res = res
    this.get = get
    this.pagination = more ? get().pagination : paginationDefault
  }

  getPagination() {
    return {
      ...this.pagination,
      totalItems: +this.res.headers['x-total-count'],
      pagesCount: Math.ceil(
        +this.res.headers['x-total-count'] / this.get().pagination._limit
      ),
    }
  }
}
