import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { create } from 'zustand'
import type { NewMessage, Message } from '@/types/club'
import { messageService } from '@services'
import { socket } from '@utils'
import { useAuth } from '..'

const paginationDefault = {
  pagesCount: 0,
  totalItems: 0,
  _limit: 60,
  _page: 1,
}

type Pagination = typeof paginationDefault

export type Messages = {
  roomId: string | null
  userId: string | null
  messages: Message[]
  pagination: Pagination
  loading: boolean
  create: (data: NewMessage) => void
  getMessages: (id: string, chatId: string) => void
  getMore: (id: string) => void
  delete: (id: string) => void
  setMessage: (data: Message[]) => void
}

export const useMessages = create<Messages>()((set, get) => ({
  messages: [],
  roomId: null,
  userId: null,
  pagination: paginationDefault,
  loading: false,
  create: async ({ text }) => {
    const { user: currentUser } = useAuth.getState()

    const newMessage = {
      id: new Date().getTime(),
      room: [currentUser!._id, get().userId],
      roomID: get().roomId,
      user: currentUser!._id,
      text,
      date: new Date().getTime(),
      socketID: socket.id,
    }

    const newMessageForSocket = {
      id: new Date().getTime(),
      room: [currentUser!._id, get().userId],
      roomID: get().roomId,
      user: currentUser,
      text,
      date: new Date().getTime(),
      socketID: socket.id,
    }

    socket.emit('message', newMessageForSocket)

    try {
      set(() => ({ loading: true }))
      const res = await messageService.create(newMessage as NewMessage)
      const messages = get().messages.map(message => {
        if (message.id === res.data.id) {
          return { ...message, _id: res.data._id }
        } else {
          return message
        }
      })
      set(() => ({ messages }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  getMessages: async (userId, roomId) => {
    try {
      set(() => ({ loading: true, messages: [] }))
      const res = await messageService.getAll(userId, getUrlParams(get, {}))
      const messages = res.data.reverse()
      const halper = new Halper(res, get)
      const pagination = halper.getPagination()
      set(() => ({
        roomId,
        userId,
        messages,
        pagination,
        loading: false,
      }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  getMore: async id => {
    try {
      set(() => ({
        loading: true,
        pagination: { ...get().pagination, _page: get().pagination._page + 1 },
      }))
      const res = await messageService.getAll(id, getUrlParams(get))
      const halper = new Halper(res, get, {})
      const pagination = halper.getPagination()
      const messages = get().messages
      messages.unshift(...res.data.reverse())
      set(() => ({ messages, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  delete: async id => {
    try {
      await messageService.delete(id)
      const messages = get().messages!.filter(message => message._id !== id)
      set(() => ({ messages }))
    } catch (error) {
      toast.info('Something went wrong. Try again!')
    }
  },
  setMessage: async messages => {
    set(() => ({ messages }))
  },
}))

function getUrlParams(get: () => Messages, pagi?: object) {
  const pagination = pagi ? paginationDefault : get().pagination

  return {
    searchParams: {
      _limit: String(pagination._limit),
      _page: String(pagination._page),
    },
  }
}

export class Halper {
  res: AxiosResponse<Message[]>
  get: () => Messages
  pagination: Pagination

  constructor(
    res: AxiosResponse<Message[]>,
    get: () => Messages,
    more?: object
  ) {
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
