import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { create } from 'zustand'
import type { Group, Pagination } from '@/types/club'
import { groupService } from '@services'

export type Groups = {
  groups: Group[]
  filter: { title: string }
  pagination: Pagination
  loading: boolean
  getGroups: () => void
  getGroupsMore: () => void
  setFilter: (title: string) => void
}

const paginationDefault = {
  pagesCount: 0,
  totalItems: 0,
  _limit: 60,
  _page: 1,
}

export const useGroups = create<Groups>()((set, get) => ({
  groups: [],
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
