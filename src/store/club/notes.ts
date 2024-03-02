import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { create } from 'zustand'
import { noteService } from '@/services'
import type { CreateNote, Note, Pagination } from '@/types/club'

export type Notes = {
  notes: Note[]
  pagination: Pagination
  loading: boolean
  createNote: (data: CreateNote) => void
  getNotes: (id: string, by: string) => void
  getNotesMore: (id: string, by: string) => void
  deleteNote: (id: string) => void
  setNotesPage: (number: number) => void
}

const paginationDefault = {
  pagesCount: 0,
  totalItems: 0,
  _limit: 8,
  _page: 1,
}

export const useNotes = create<Notes>()((set, get) => ({
  notes: [],
  pagination: paginationDefault,
  loading: false,
  createNote: async data => {
    try {
      set(() => ({ loading: true }))
      const { data: created } = await noteService.create(data)
      const notes = get().notes
      notes.unshift(created)
      set(() => ({ notes, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  getNotes: async (id, by) => {
    try {
      set(() => ({ loading: true, notes: [] }))
      const res = await noteService.getAll(id, getUrlParams(by, get, {}))
      const notes = res.data
      const halper = new noteHalper(res, get)
      const pagination = halper.getPagination()
      set(() => ({ notes, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  getNotesMore: async (id, by) => {
    try {
      set(() => ({
        loading: true,
        pagination: { ...get().pagination, _page: get().pagination._page + 1 },
      }))
      const res = await noteService.getAll(id, getUrlParams(by, get))
      const halper = new noteHalper(res, get, {})
      const pagination = halper.getPagination()
      const notes = get().notes
      notes.push(...res.data)
      set(() => ({ notes, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  deleteNote: async id => {
    try {
      await noteService.delete(id)
      const notes = get().notes!.filter(note => note._id !== id)
      set(() => ({ notes }))
    } catch (error) {
      toast.info('Something went wrong. Try again!')
    }
  },
  setNotesPage: number =>
    set(() => ({ pagination: { ...get().pagination, _page: number } })),
}))

function getUrlParams(by: string, get: () => Notes, pagi?: object) {
  const pagination = pagi ? paginationDefault : get().pagination

  return {
    searchParams: {
      _limit: String(pagination._limit),
      _page: String(pagination._page),
      by,
    },
  }
}

export class noteHalper {
  res: AxiosResponse<Note[]>
  get: () => Notes
  pagination: Pagination

  constructor(res: AxiosResponse<Note[]>, get: () => Notes, more?: object) {
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
