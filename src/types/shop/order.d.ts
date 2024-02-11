import { CartItem, Product } from '.'

export type Order = {
  _id?: number
  id: number
  name: string
  surname: string
  middleName: string
  region: string
  city: string
  street: string
  home: string
  index: number
  cartItems: CartItem[]
  totalCost: number
  status: string
  created: string
}

export type CreateOrder = Omit<Product, 'id' | '_id' | 'status' | 'created'>
