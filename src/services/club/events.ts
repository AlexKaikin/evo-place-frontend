import { Event } from '@/types/club'
import { api } from '@configs'
import { UrlParams, createUrlParams } from '@utils'

export const eventService = {
  getAll(params: UrlParams) {
    return api.get<Event[]>(`events/?${createUrlParams(params)}`)
  },
}
