import { Post } from '@/types/blog'
import { api } from '@configs'
import { UrlParams, createUrlParams } from '@utils'

export const postService = {
  getAll(params: UrlParams) {
    return api.get<Post[]>(`posts/?${createUrlParams(params)}`)
  },
  getOne(id: number) {
    return api.get<Post>(`posts/${id}`)
  },
}
