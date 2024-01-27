import { Comment, CreateComment } from '@/types/blog'
import { api } from '@configs'

export const commentService = {
  getAll(post_id: string) {
    return api.get<Comment[]>(`posts/${post_id}/comments`)
  },
  create(values: CreateComment) {
    return api.post<Comment>(`comments`, values)
  },
}
