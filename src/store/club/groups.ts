/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { create } from 'zustand'
import type { Group, Pagination } from '@/types/club'
import { groupService } from '@services'
import { useAuth } from '..'

export type Groups = {
  groups: Group[]
  group: Group | null
  filter: { title: string }
  pagination: Pagination
  loading: boolean
  getGroups: () => void
  setGroup: (data: Group) => void
  getGroupsMore: () => void
  setFilter: (title: string) => void
  create: (data: Group) => Promise<AxiosResponse<Group, any> | undefined>
  update: (data: Group) => Promise<Group | undefined>
  deleteGroup: (id: string) => Promise<Group | undefined>
  follow: (group: Group) => Promise<object | undefined>
  unFollow: (group: Group) => Promise<object | undefined>
}

const paginationDefault = {
  pagesCount: 0,
  totalItems: 0,
  _limit: 60,
  _page: 1,
}

export const useGroups = create<Groups>()((set, get) => ({
  groups: [],
  group: null,
  filter: { title: '' },
  pagination: paginationDefault,
  loading: false,
  getGroups: async () => {
    try {
      set(() => ({ loading: true, groups: [] }))
      const res = await groupService.getAll(getUrlParams(get, {}))
      const groups = res.data
      const halper = new groupHalper(res, get)
      const pagination = halper.getPagination()
      set(() => ({ groups, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  getGroupsMore: async () => {
    try {
      set(() => ({
        loading: true,
        pagination: { ...get().pagination, _page: get().pagination._page + 1 },
      }))
      const res = await groupService.getAll(getUrlParams(get))
      const halper = new groupHalper(res, get, {})
      const pagination = halper.getPagination()
      const groups = get().groups
      groups.push(...res.data)
      set(() => ({ groups, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  setFilter: title => set(() => ({ filter: { title } })),
  create: async data => {
    try {
      const res = await groupService.create(data)
      return res
    } catch (error) {
      toast.info('Something went wrong. Try again!')
    }
  },
  update: async data => {
    try {
      const res = await groupService.update(data)
      set(() => ({ group: res.data }))
      toast.info('Profile updated')
      return res.data
    } catch (error) {
      toast.info('Something went wrong. Try again!')
    }
  },
  deleteGroup: async id => {
    try {
      const res = await groupService.delete(id)
      return res.data
    } catch (error) {
      toast.info('Something went wrong. Try again!')
    }
  },
  follow: async group => {
    set(() => ({ loading: true }))
    try {
      const res = await groupService.follow(group._id)
      const { setUser, user: currentUser } = useAuth.getState()

      const subscriptionsGroup = [...currentUser!.subscriptionsGroup]
      subscriptionsGroup.push(group as any)
      setUser({ ...currentUser!, subscriptionsGroup })

      group.subscribers.push(currentUser!)
      set(() => ({ loading: false, group }))

      return res.data
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  unFollow: async group => {
    set(() => ({ loading: true }))
    try {
      const res = await groupService.unFollow(group._id)

      const { setUser, user: currentUser } = useAuth.getState()

      const subscriptionsGroup = currentUser!.subscriptionsGroup.filter(
        el => el._id !== group._id
      )
      setUser({ ...currentUser!, subscriptionsGroup })

      group.subscribers = group.subscribers.filter(
        el => el._id !== currentUser!._id
      )
      set(() => ({ loading: false, group }))

      return res.data
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  setGroup: async group => {
    set(() => ({ group }))
  },
}))

function getUrlParams(get: () => Groups, pagi?: object) {
  const pagination = pagi ? paginationDefault : get().pagination

  return {
    searchParams: {
      _limit: String(pagination._limit),
      _page: String(pagination._page),
      q: get().filter.title,
    },
  }
}

export class groupHalper {
  res: AxiosResponse<Group[]>
  get: () => Groups
  pagination: Pagination

  constructor(res: AxiosResponse<Group[]>, get: () => Groups, more?: object) {
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
