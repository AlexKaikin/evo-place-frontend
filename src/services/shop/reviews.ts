import { CreateReview, Review } from '@/types/shop'
import { api } from '@configs'

export const reviewService = {
  getAll(product_Id: string) {
    return api.get<Review[]>(`reviews/products/${product_Id}`)
  },
  create(values: CreateReview) {
    return api.post<Review>(`reviews`, values)
  },
}
