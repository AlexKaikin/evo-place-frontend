import { Comment } from '@/types/blog'
import { api } from '@configs'
import { createUrlParams, UrlParams } from '@utils'

export const accountCommentService = {
  getAll(params: UrlParams) {
    return api.get<Comment[]>(`profile/comments?${createUrlParams(params)}`)
  },
}
