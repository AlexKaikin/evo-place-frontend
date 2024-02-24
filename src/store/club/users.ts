import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { create } from 'zustand'
import type { User, Pagination } from '@/types/auth'
import { userService } from '@services'

export type Users = {
  users: User[]
  filter: { name: string }
  pagination: Pagination
  loading: boolean
  getUsers: () => void
  getUsersMore: () => void
  setUsersPage: (number: number) => void
  setFilter: (name: string) => void
}

const paginationDefault = {
  pagesCount: 0,
  totalItems: 0,
  limitItems: 60,
  currentPage: 1,
}

export const useUsers = create<Users>()((set, get) => ({
  users: [],
  filter: { name: '' },
  pagination: paginationDefault,
  loading: false,
  getUsers: async () => {
    try {
      set(() => ({ loading: true }))
      const res = await userService.getAll(get().filter, paginationDefault)
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
      set(() => ({ loading: true }))
      const res = await userService.getAll(get().filter, get().pagination)
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
  setUsersPage: number =>
    set(() => ({ pagination: { ...get().pagination, currentPage: number } })),
  setFilter: name => set(() => ({ filter: { name } })),
}))

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
        +this.res.headers['x-total-count'] / this.get().pagination.limitItems
      ),
    }
  }
}
