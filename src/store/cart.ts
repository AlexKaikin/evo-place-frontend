import { toast } from 'react-toastify'
import { create } from 'zustand'
import { CartItem } from '@/types/shop'
import { getLocalStorage } from '@utils'

export type CartStore = {
  cartItems: CartItem[]
  totalCost: number
  getCart: () => void
  setCart: (product: CartItem) => void
  deleteCartItem: (id: number) => void
}

export const useCartStore = create<CartStore>()(set => ({
  cartItems: [],
  totalCost: 0,
  getCart: () =>
    set(() => ({
      cartItems: getLocalStorage('cart'),
      totalCost: getTotalCost(),
    })),
  setCart: product => {
    set(() => ({
      cartItems: addToCart(product),
      totalCost: getTotalCost(),
    }))
  },
  deleteCartItem: id =>
    set(() => ({ cartItems: deleteItem(id), totalCost: getTotalCost() })),
}))

function addToCart(product: CartItem) {
  const cartItems: CartItem[] = getLocalStorage('cart')
  const findProduct = cartItems.find(item => item.id === product.id)

  toast.info('Added to cart')

  if (!findProduct) {
    cartItems.push(product)
    localStorage.setItem('cart', JSON.stringify(cartItems))

    return [...cartItems]
  } else {
    findProduct.quantity = product.quantity
    findProduct.cost = product.cost
    localStorage.setItem('cart', JSON.stringify(cartItems))

    return [...cartItems]
  }
}

function getTotalCost() {
  const cartItems = getLocalStorage('cart')

  return cartItems.reduce(
    (totalCost: number, item: CartItem) => totalCost + item.cost,
    0
  )
}

function deleteItem(id: number) {
  const cartItems: CartItem[] = getLocalStorage('cart')
  const findProduct = cartItems.find(item => item.id === id)
  findProduct && cartItems.splice(cartItems.indexOf(findProduct), 1)
  localStorage.setItem('cart', JSON.stringify(cartItems))

  return [...cartItems]
}
