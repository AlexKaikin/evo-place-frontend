import { Recommend } from '@/types/club'
import { api } from '@configs'

export const recommendationService = {
  getAll() {
    return api.get<Recommend[]>(`recommendations/`)
  },
}
