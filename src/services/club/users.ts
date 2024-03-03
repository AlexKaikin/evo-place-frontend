import { User } from '@/types/auth'
import { api } from '@configs'
import { UrlParams, createUrlParams } from '@utils'

export const userService = {
  getAll(params: UrlParams) {
    return api.get<User[]>(`users/${createUrlParams(params)}`)
  },
  getOne(id: string) {
    return api.get<User>(`users/${id}`)
  },
  follow(_id: string) {
    return api.patch<{ user_id: string }>(`users/follow/${_id}`)
  },
  unFollow(_id: string) {
    return api.patch<{ user_id: string }>(`users/unfollow/${_id}`)
  },
}
