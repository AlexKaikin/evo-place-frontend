import { toast } from 'react-toastify'
import { create } from 'zustand'
import { noteService } from '@/services'
import type { CreateNote, Note, Pagination } from '@/types/club'

export type Notes = {
  notes: Note[]
  pagination: Pagination
  loading: boolean
  createNotesUser: (data: CreateNote) => void
  getNotesUser: (id: string) => void
  getNotesUserMore: (id: string) => void
  deleteNote: (id: string) => void
  setNotesPage: (number: number) => void
}

const paginationDefault = {
  pagesCount: 0,
  totalItems: 0,
  limitItems: 8,
  currentPage: 1,
}

export const useNotes = create<Notes>()((set, get) => ({
  notes: [],
  pagination: paginationDefault,
  loading: false,
  createNotesUser: async data => {
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
  getNotesUser: async id => {
    try {
      set(() => ({ loading: true }))
      const res = await noteService.getAll(id, 'user', paginationDefault)
      const notes = res.data
      const pagination = {
        ...paginationDefault,
        totalItems: +res.headers['x-total-count'],
        pagesCount: Math.ceil(
          +res.headers['x-total-count'] / get().pagination.limitItems
        ),
      }
      set(() => ({ notes, pagination, loading: false }))
    } catch (error) {
      set(() => ({ loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  getNotesUserMore: async id => {
    try {
      set(() => ({ loading: true }))
      const res = await noteService.getAll(id, 'user', get().pagination)
      const notes = get().notes
      notes.push(...res.data)
      const pagination = {
        ...get().pagination,
        totalItems: +res.headers['x-total-count'],
        pagesCount: Math.ceil(
          +res.headers['x-total-count'] / get().pagination.limitItems
        ),
      }

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
    set(() => ({ pagination: { ...get().pagination, currentPage: number } })),
}))
