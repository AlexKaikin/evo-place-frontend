import { toast } from 'react-toastify'
import { create } from 'zustand'
import { Product } from '@/types/shop'
import { getLocalStorage } from '@utils'

export type CompareStore = {
  compareItems: Product[]
  getCompare: () => void
  toggleCompare: (product: Product) => void
}

export const useCompareStore = create<CompareStore>()(set => ({
  compareItems: [],
  getCompare: () => set(() => ({ compareItems: getLocalStorage('compare') })),
  toggleCompare: product => {
    set(() => ({
      compareItems: handleToggleCompare(product),
    }))
  },
}))

function handleToggleCompare(product: Product) {
  const compareItems: Product[] = getLocalStorage('compare')
  const findProduct = compareItems.find(item => item.id === product.id)

  if (!findProduct) {
    compareItems.push(product)
    localStorage.setItem('compare', JSON.stringify(compareItems))
    toast.info('Added for comparison')

    return [...compareItems]
  } else {
    compareItems.splice(compareItems.indexOf(findProduct), 1)
    localStorage.setItem('compare', JSON.stringify(compareItems))
    toast.info('Excluded from the comparison')

    return [...compareItems]
  }
}
