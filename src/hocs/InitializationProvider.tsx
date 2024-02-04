'use client'

import { ReactNode, useEffect } from 'react'
import {
  useCart,
  useFavoriteProducts,
  useCompare,
  useAuth,
  useFavoritePosts,
} from '@store'

export function InitializationProvider({ children }: { children: ReactNode }) {
  const { getMe } = useAuth()
  const { getCart } = useCart()
  const { getCompare } = useCompare()
  const { getFavoritePosts } = useFavoritePosts()
  const { getFavoriteProducts } = useFavoriteProducts()

  useEffect(() => {
    getMe()
    getCart()
    getFavoriteProducts()
    getCompare()
    getFavoritePosts()
  }, [getCart, getCompare, getFavoritePosts, getFavoriteProducts, getMe])

  return <>{children}</>
}
