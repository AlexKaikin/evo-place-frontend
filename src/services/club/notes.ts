import { Note, Pagination, CreateNote } from '@/types/club'
import { api, options } from '@configs'

export const noteService = {
  getAll(user_Id: string, by: string, pagination: Pagination) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    return api.get<Note[]>(`notes/${user_Id}/?by=${by}&${$pagination}`)
  },
  getOne(id: number) {
    return api.get<Note>(`notes/${id}`)
  },
  uploadNoteImg(formData: FormData) {
    return api.post('/upload', formData, options.multipart)
  },
  create(data: CreateNote) {
    return api.post<Note>(`notes/`, data, options.json)
  },
  update(data: Note) {
    return api.patch<Note>(`notes/${data.id}`, data, options.json)
  },
  delete(id: string) {
    return api.delete<Note>(`notes/${id}`)
  },
}
