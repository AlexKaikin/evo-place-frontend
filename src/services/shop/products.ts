import { Product } from '@/types/shop'
import { api } from '@configs'
import { UrlParams, createUrlParams } from '@utils'

export const productService = {
  getAll(params: UrlParams) {
    return api.get<Product[]>(`products/?${createUrlParams(params)}`)
  },
  getOne(id: string) {
    return api.get<Product>(`products/${id}`)
  },
}
