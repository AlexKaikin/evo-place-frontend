import { Pagination, User } from '@/types/auth'
import { api } from '@configs'

export const userService = {
  getAll(filter: { name: string }, pagination: Pagination) {
    const { name } = filter
    const $q = name === '' ? `` : `q=${name}&`
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`

    return api.get<User[]>(`users/?${$q + $pagination}`)
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
