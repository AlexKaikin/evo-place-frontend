'use client'

import { Product } from '@/types/shop'
import { IconButton } from '@ui'
import { getLocalStorage } from '@utils'

type Props = {
  product: Product
}

export function FavoritesButton({ product }: Props) {
  function favoritesClick() {
    const favoritesItems: Product[] = getLocalStorage('favorites')
    const findProduct = favoritesItems.find(item => item.id === product.id)

    if (findProduct) {
      favoritesItems.splice(favoritesItems.indexOf(findProduct), 1)
    } else {
      favoritesItems.push(product)
    }
    localStorage.setItem('favorites', JSON.stringify(favoritesItems))
  }

  return (
    <IconButton
      color="secondary"
      icon="BsBookmark"
      size="17"
      onClick={favoritesClick}
    />
  )
}
