import { toast } from 'react-toastify'
import { create } from 'zustand'
import { CartItem } from '@/types/shop'
import { getLocalStorage } from '@utils'

export type CartStore = {
  cartItems: CartItem[]
  totalCost: number
  getCart: () => void
  setCart: (product: CartItem) => void
  decriment: (id: number) => void
  increment: (id: number) => void
  changeQuantity: (id: number, quantity: number) => void
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
  decriment: id =>
    set(() => ({ cartItems: handleDecriment(id), totalCost: getTotalCost() })),
  increment: id =>
    set(() => ({ cartItems: handleIncrement(id), totalCost: getTotalCost() })),
  changeQuantity: (id, quantity) =>
    set(() => ({
      cartItems: handleChangeQuantity(id, quantity),
      totalCost: getTotalCost(),
    })),
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

function handleChangeQuantity(id: number, quantity: number) {
  const cartItems: CartItem[] = getLocalStorage('cart')
  const findProduct = cartItems.find(item => item.id === id)
  if (findProduct) {
    if (quantity > findProduct.inStock || quantity < 1) {
      findProduct.quantity = 1
      findProduct.cost = findProduct.price
    } else {
      findProduct.quantity = quantity
      findProduct.cost = quantity * findProduct.cost
    }
  }
  localStorage.setItem('cart', JSON.stringify(cartItems))

  return [...cartItems]
}

function handleIncrement(id: number) {
  const cartItems: CartItem[] = getLocalStorage('cart')
  const findProduct = cartItems.find(item => item.id === id)
  if (findProduct && findProduct.quantity < findProduct.inStock) {
    findProduct.quantity = findProduct.quantity + 1
    findProduct.cost = findProduct.cost + findProduct.price
  }
  localStorage.setItem('cart', JSON.stringify(cartItems))

  return [...cartItems]
}

function handleDecriment(id: number) {
  const cartItems: CartItem[] = getLocalStorage('cart')
  const findProduct = cartItems.find(item => item.id === id)
  if (findProduct && findProduct.quantity > 1) {
    findProduct.quantity = findProduct.quantity - 1
    findProduct.cost = findProduct.cost - findProduct.price
  }
  localStorage.setItem('cart', JSON.stringify(cartItems))

  return [...cartItems]
}
