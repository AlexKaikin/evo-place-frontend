import { Order } from '@/types/shop'
import { api } from '@configs'
import { createUrlParams, UrlParams } from '@utils'

export const accountOrderService = {
  getAll(params: UrlParams) {
    return api.get<Order[]>(`orders?${createUrlParams(params)}`)
  },
}
