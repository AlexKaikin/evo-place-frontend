import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { create } from 'zustand'
import type { Event } from '@/types/club'
import { eventService } from '@services'

const paginationDefault = {
  pagesCount: 0,
  totalItems: 0,
  _limit: 60,
  _page: 1,
}

type Pagination = typeof paginationDefault

export type Events = {
  events: Event[]
  pagination: Pagination
  loading: boolean
  getEvents: () => void
  getMore: () => void
}

export const useEvents = create<Events>()((set, get) => ({
  events: [],
  pagination: paginationDefault,
  loading: false,
  getEvents: async () => {
    try {
      set(() => ({ loading: true, events: [] }))
      const res = await eventService.getAll(getUrlParams(get, {}))
      const events = res.data
      const halper = new Halper(res, get)
      const pagination = halper.getPagination()
      set(() => ({ events, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  getMore: async () => {
    try {
      set(() => ({
        loading: true,
        pagination: { ...get().pagination, _page: get().pagination._page + 1 },
      }))
      const res = await eventService.getAll(getUrlParams(get))
      const halper = new Halper(res, get, {})
      const pagination = halper.getPagination()
      const events = get().events
      events.push(...res.data)
      set(() => ({ events, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
}))

function getUrlParams(get: () => Events, pagi?: object) {
  const pagination = pagi ? paginationDefault : get().pagination

  return {
    searchParams: {
      _limit: String(pagination._limit),
      _page: String(pagination._page),
    },
  }
}

export class Halper {
  res: AxiosResponse<Event[]>
  get: () => Events
  pagination: Pagination

  constructor(res: AxiosResponse<Event[]>, get: () => Events, more?: object) {
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
