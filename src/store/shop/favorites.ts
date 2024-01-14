import { toast } from 'react-toastify'
import { create } from 'zustand'
import { Product } from '@/types/shop'
import { getLocalStorage } from '@utils'

export type Favorites = {
  favoritesItems: Product[]
  getFavorites: () => void
  toggleFavorite: (product: Product) => void
}

export const useFavorites = create<Favorites>()(set => ({
  favoritesItems: [],
  getFavorites: () =>
    set(() => ({ favoritesItems: getLocalStorage('favorites') })),
  toggleFavorite: product => {
    set(() => ({
      favoritesItems: handleToggleFavorite(product),
    }))
  },
}))

function handleToggleFavorite(product: Product) {
  const favoriteItems: Product[] = getLocalStorage('favorites')
  const findProduct = favoriteItems.find(item => item.id === product.id)

  if (!findProduct) {
    favoriteItems.push(product)
    localStorage.setItem('favorites', JSON.stringify(favoriteItems))
    toast.info('Added to favorites')

    return [...favoriteItems]
  } else {
    favoriteItems.splice(favoriteItems.indexOf(findProduct), 1)
    localStorage.setItem('favorites', JSON.stringify(favoriteItems))
    toast.info('De-favored')

    return [...favoriteItems]
  }
}
