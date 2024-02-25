import { Note, CreateNote } from '@/types/club'
import { api, options } from '@configs'
import { UrlParams, createUrlParams } from '@utils'

export const noteService = {
  getAll(userId: string, params: UrlParams) {
    return api.get<Note[]>(`notes/${userId}/${createUrlParams(params)}`)
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
