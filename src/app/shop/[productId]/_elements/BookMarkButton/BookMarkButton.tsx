'use client'

import { Product } from '@/types/shop'
import { IconButton } from '@ui'
import { getLocalStorage } from '@utils'

type Props = {
  product: Product
}

export function BookMarkButton({ product }: Props) {
  function compareClick() {
    const comapreItems: Product[] = getLocalStorage('compare')
    const findProduct = comapreItems.find(item => item.id === product.id)

    if (findProduct) {
      comapreItems.splice(comapreItems.indexOf(findProduct), 1)
    } else {
      comapreItems.push(product)
    }

    localStorage.setItem('compare', JSON.stringify(comapreItems))
  }

  return (
    <IconButton
      color="secondary"
      icon="FiBarChart2"
      size="17"
      onClick={compareClick}
    />
  )
}
