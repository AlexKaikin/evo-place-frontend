import { toast } from 'react-toastify'
import { Recommend } from '@/types/club'
import { api } from '@configs'

export const recommendationService = {
  async getAll() {
    try {
      const response = await api.get<Recommend[]>(`recommendations/`)
      return response.data
    } catch (error) {
      toast.info('Error loading recommendations!')
      return []
    }
  },
}
