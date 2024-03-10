import { User } from '@/types/auth'
import { Chat } from '@/types/club'
import { api, options } from '@configs'
import { UrlParams, createUrlParams } from '@utils'

export const chatService = {
  getAll(params: UrlParams) {
    return api.get<Chat[]>(`rooms/?${createUrlParams(params)}`)
  },
  getUsers(name: string) {
    return api.get<User[]>(`rooms/search?name=${name}`)
  },
  getOne(_id: string) {
    return api.get<Chat>(`rooms/${_id}`)
  },
  create(data: Chat) {
    return api.post<Chat>(`rooms/`, data, options.json)
  },
  update(data: Chat) {
    return api.patch<Chat>(`rooms/${data.id}`, data, options.json)
  },
  delete(id: number) {
    return api.delete<Chat>(`rooms/${id}`)
  },
}
