/* eslint-disable no-console */
import { Post } from '@/types/blog'
import { api } from '@configs'
import { UrlParams, createUrlParams } from '@utils'

export const postService = {
  async getAll(params: UrlParams) {
    try {
      const response = await api.get<Post[]>(
        `posts/?${createUrlParams(params)}`
      )
      const posts = response.data
      const totalCount = response.headers['x-total-count']
      return { posts, totalCount }
    } catch (error) {
      console.error('Error loading posts!')
      return { posts: [], totalCount: 0 }
    }
  },
  async getOne(id: string) {
    try {
      const response = api.get<Post>(`posts/${id}`)
      const post = (await response).data
      return { post, status: 200 }
    } catch (error) {
      console.error('Error loading post!')
      return { post: {} as Post, status: 500 }
    }
  },
}
