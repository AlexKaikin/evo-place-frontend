import { CartItem } from '.'

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

export type CreateOrder = Omit<Order, 'id' | '_id' | 'status' | 'created'>
