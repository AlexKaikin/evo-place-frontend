import { Product } from '@/types/shop'
import { api, options } from '@configs'
import { UrlParams, createUrlParams } from '@utils'

export const adminProductService = {
  getAll(params: UrlParams) {
    return api.get<Product[]>(`admin/products/?${createUrlParams(params)}`)
  },
  getOne(id: string) {
    return api.get<Product>(`admin/products/${id}`)
  },
  create(data: Product) {
    return api.post<Product>(`admin/products/`, data, options.multipart)
  },
  update(id: string, data: Product) {
    return api.patch<Product>(`admin/products/${id}`, data, options.multipart)
  },
  delete(id: string) {
    return api.delete<Product>(`admin/products/${id}`)
  },
}
