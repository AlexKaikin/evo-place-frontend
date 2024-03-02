import { Group } from '@/types/club'
import { api, options } from '@configs'
import { UrlParams, createUrlParams } from '@utils'

export const groupService = {
  getAll(params: UrlParams) {
    return api.get<Group[]>(`groups/${createUrlParams(params)}`)
  },
  getOne(id: string) {
    return api.get<Group>(`groups/${id}`)
  },
  uploadImg(formData: FormData) {
    return api.post('/upload', formData, options.multipart)
  },
  create(data: Group) {
    return api.post<Group>(`groups/`, data, options.json)
  },
  update(data: Group) {
    return api.patch<Group>(`groups/${data.id}`, data, options.json)
  },
  delete(id: string) {
    return api.delete<Group>(`groups/${id}`)
  },
  follow(_id: string) {
    return api.patch<string>(`groups/follow/${_id}`)
  },
  unFollow(_id: string) {
    return api.patch<string>(`groups/unfollow/${_id}`)
  },
}
