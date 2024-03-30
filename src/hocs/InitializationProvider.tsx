'use client'

import { ReactNode, useEffect } from 'react'
import {
  useCart,
  useFavoriteProducts,
  useCompare,
  useAuth,
  useFavoritePosts,
  useLangs,
} from '@store'

export function InitializationProvider({ children }: { children: ReactNode }) {
  const { getMe } = useAuth()
  const { getCart } = useCart()
  const { getLang } = useLangs()
  const { getCompare } = useCompare()
  const { getFavoritePosts } = useFavoritePosts()
  const { getFavoriteProducts } = useFavoriteProducts()

  useEffect(() => {
    getMe()
    getCart()
    getFavoriteProducts()
    getCompare()
    getFavoritePosts()
    getLang()
  }, [
    getCart,
    getCompare,
    getFavoritePosts,
    getFavoriteProducts,
    getLang,
    getMe,
  ])

  return <>{children}</>
}
