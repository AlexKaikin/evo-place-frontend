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
  followUser(_id: string) {
    return api.patch<string>(`users/follow/${_id}`)
  },
  unFollowUser(_id: string) {
    return api.patch<string>(`users/unfollow/${_id}`)
  },
}
