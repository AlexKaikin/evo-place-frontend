import { CreateOrder, Order } from '@/types/shop/order'
import { api, options } from '@configs'
import { createUrlParams, UrlParams } from '@utils'

export const orderService = {
  getAll(searchParams: UrlParams) {
    return api.get<Order[]>(`orders?${createUrlParams(searchParams)}`)
  },
  getAllForAdmin(searchParams: UrlParams) {
    return api.get<Order[]>(`admin/orders?${createUrlParams(searchParams)}`)
  },
  create(values: CreateOrder) {
    return api.post<Order>(`orders`, values, options.json)
  },
  update(data: Order) {
    return api.patch<Order>(`admin/orders/${data.id}`, data)
  },
  delete(id: number) {
    return api.delete<Order>(`admin/orders/${id}`)
  },
}
