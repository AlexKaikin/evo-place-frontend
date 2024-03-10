import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { create } from 'zustand'
import { chatService } from '@/services'
import type { Chat } from '@/types/club'
import { useMessages } from '..'

const paginationDefault = {
  pagesCount: 0,
  totalItems: 0,
  _limit: 60,
  _page: 1,
}

type Pagination = typeof paginationDefault

export type Chats = {
  chats: Chat[]
  pagination: Pagination
  loading: boolean
  getChats: () => void
  getNotesMore: (id: string, by: string) => void
  open: (id: string, chatId: string) => void
  //   deleteNote: (id: string) => void
}

export const useChats = create<Chats>()((set, get) => ({
  chats: [],
  pagination: paginationDefault,
  loading: false,
  getChats: async () => {
    try {
      set(() => ({ loading: true, chats: [] }))
      const res = await chatService.getAll(getUrlParams(get, {}))
      const chats = res.data.reverse()
      const halper = new Halper(res, get)
      const pagination = halper.getPagination()
      set(() => ({ chats, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  getNotesMore: async () => {
    try {
      set(() => ({
        loading: true,
        pagination: { ...get().pagination, _page: get().pagination._page + 1 },
      }))
      const res = await chatService.getAll(getUrlParams(get))
      const halper = new Halper(res, get, {})
      const pagination = halper.getPagination()
      const chats = get().chats
      chats.push(...res.data.reverse())
      set(() => ({ chats, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  open: async (id, chatId) => {
    const { getMessages } = useMessages.getState()
    getMessages(id, chatId)
  },
  //   deleteNote: async id => {
  //     try {
  //       await noteService.delete(id)
  //       const notes = get().notes!.filter(note => note._id !== id)
  //       set(() => ({ notes }))
  //     } catch (error) {
  //       toast.info('Something went wrong. Try again!')
  //     }
  //   },
}))

function getUrlParams(get: () => Chats, pagi?: object) {
  const pagination = pagi ? paginationDefault : get().pagination

  return {
    searchParams: {
      _limit: String(pagination._limit),
      _page: String(pagination._page),
    },
  }
}

export class Halper {
  res: AxiosResponse<Chat[]>
  get: () => Chats
  pagination: Pagination

  constructor(res: AxiosResponse<Chat[]>, get: () => Chats, more?: object) {
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
