'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/types/shop'
import { Button, Icon, IconButton, Input, Stack } from '@ui'
import { BookMarkButton } from '../BookMarkButton/BookMarkButton'
import { FavoritesButton } from '../FavoritesButton/FavoritesButton'
import styles from './AddToCart.module.css'

type Props = {
  product: Product
}

export function AddToCart({ product }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [cost, setCost] = useState(product.price)
  const { setCart } = useCartStore()

  function increment() {
    setQuantity(prevQuantity => prevQuantity + 1)
    setCost(prevCost => prevCost + product.price)
  }

  function decriment() {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
      setCost(prevCost => prevCost - product.price)
    }
  }

  function quantityBlur(e: React.FocusEvent<HTMLInputElement>) {
    const number = +e.target.value
    if (Number.isNaN(number) || number < 1) {
      setQuantity(1)
      setCost(product.price)
    }
  }

  function quantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!Number.isNaN(+e.target.value)) {
      setQuantity(+e.target.value)
      setCost(product.price * +e.target.value)
    }
  }

  function addToCart() {
    const { id, imgUrl, title, price } = product
    setCart({ id, imgUrl, title, price, quantity, cost })
  }

  return (
    <>
      <div className={styles.calc}>
        <div className={styles.quantity}>
          <div className={styles.quantityTitle}>Quantity</div>
          <div className={styles.quantityContent}>
            <IconButton icon="BsDashLg" onClick={decriment} />
            <Input
              type="text"
              onBlur={quantityBlur}
              onChange={quantityChange}
              value={quantity}
              align="center"
              min="1"
              max="7"
            />
            <IconButton icon="BsPlusLg" onClick={increment} />
          </div>
        </div>
        <div className={styles.productPrice}>
          <div className={styles.priceTitle}>Cost</div>
          <div className={styles.priceNumber}>$ {cost}</div>
        </div>
      </div>
      <Stack direction="row" gap={10} justifyContent="flex-start">
        <BookMarkButton product={product} />
        <FavoritesButton product={product} />
        <Button endIcon={<Icon name="BsBag" size="17" />} onClick={addToCart}>
          Add to cart
        </Button>
      </Stack>
    </>
  )
}
