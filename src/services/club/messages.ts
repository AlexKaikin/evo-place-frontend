import { Message, NewMessage } from '@/types/club'
import { api, options } from '@configs'
import { UrlParams, createUrlParams } from '@utils'

export const messageService = {
  getAll(user_Id: string, params: UrlParams) {
    return api.get<Message[]>(`messages/${user_Id}/?${createUrlParams(params)}`)
  },
  getOne(id: number) {
    return api.get<Message>(`messages/${id}`)
  },
  create(data: NewMessage) {
    return api.post<Message>(`messages/`, data, options.json)
  },
  update(data: Message) {
    return api.patch<Message>(`messages/${data.id}`, data, options.json)
  },
  delete(id: number) {
    return api.delete<Message>(`messages/${id}`)
  },
}
