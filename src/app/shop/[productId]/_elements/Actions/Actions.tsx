'use client'

import { useState } from 'react'
import type { Product } from '@/types/shop'
import { useCart, useFavorites, useCompare } from '@store'
import { Button, Icon, IconButton, Input, Stack } from '@ui'
import styles from './Actions.module.css'

type Props = {
  product: Product
}

export function Actions({ product }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [cost, setCost] = useState(product.price)
  const { setCart } = useCart()
  const { toggleFavorite, favoritesItems } = useFavorites()
  const { toggleCompare, compareItems } = useCompare()
  const findCompare = compareItems.find(item => item.id === product.id)
  const findFavorite = favoritesItems.find(item => item.id === product.id)

  function increment() {
    if (product.inStock < quantity + 1) return null
    setQuantity(prevQuantity => prevQuantity + 1)
    setCost(prevCost => prevCost + product.price)
  }

  function decriment() {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
      setCost(prevCost => prevCost - product.price)
    }
  }

  function quantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!Number.isNaN(+e.target.value)) {
      if (+e.target.value > product.inStock || +e.target.value < 1) {
        setQuantity(1)
        setCost(product.price)
      } else {
        setQuantity(+e.target.value)
        setCost(product.price * +e.target.value)
      }
    }
  }

  function addToCart() {
    const { _id, imgUrl, title, price, inStock } = product
    setCart({ _id, imgUrl, title, price, quantity, cost, inStock })
  }

  return (
    <>
      <div className={styles.calc}>
        <div className={styles.quantity}>
          <div className={styles.quantityTitle}>Quantity</div>
          <div className={styles.quantityContent}>
            <IconButton icon="BsDashLg" onClick={decriment} />
            <Input
              type="number"
              onChange={quantityChange}
              value={quantity}
              align="center"
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
        <IconButton
          color={findCompare ? 'primary' : 'secondary'}
          icon="FiBarChart2"
          size="17"
          onClick={() => toggleCompare(product)}
        />
        <IconButton
          color={findFavorite ? 'primary' : 'secondary'}
          icon="BsBookmark"
          size="17"
          onClick={() => toggleFavorite(product)}
        />
        <Button endIcon={<Icon name="BsBag" size="17" />} onClick={addToCart}>
          Add to cart
        </Button>
      </Stack>
    </>
  )
}
