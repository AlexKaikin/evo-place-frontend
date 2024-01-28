import { toast } from 'react-toastify'
import { create } from 'zustand'
import { Post } from '@/types/blog'
import { getLocalStorage } from '@utils'

export type FavoritePosts = {
  favoritesItems: Post[]
  getFavoritePosts: () => void
  toggleFavorite: (post: Post) => void
}

export const useFavoritePosts = create<FavoritePosts>()(set => ({
  favoritesItems: [],
  getFavoritePosts: () =>
    set(() => ({ favoritesItems: getLocalStorage('favoritePosts') })),
  toggleFavorite: post => {
    set(() => ({
      favoritesItems: handleToggleFavorite(post),
    }))
  },
}))

function handleToggleFavorite(post: Post) {
  const favoriteItems: Post[] = getLocalStorage('favoritePosts')
  const findPost = favoriteItems.find(item => item._id === post._id)

  if (!findPost) {
    favoriteItems.push(post)
    localStorage.setItem('favoritePosts', JSON.stringify(favoriteItems))
    toast.info('Added to favorites')

    return [...favoriteItems]
  } else {
    favoriteItems.splice(favoriteItems.indexOf(findPost), 1)
    localStorage.setItem('favoritePosts', JSON.stringify(favoriteItems))
    toast.info('De-favored')

    return [...favoriteItems]
  }
}
