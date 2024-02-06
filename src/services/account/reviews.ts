import { Review } from '@/types/shop'
import { api } from '@configs'
import { createUrlParams, UrlParams } from '@utils'

export const accountReviewService = {
  getAll(params: UrlParams) {
    return api.get<Review[]>(`reviews/profile?${createUrlParams(params)}`)
  },
}
