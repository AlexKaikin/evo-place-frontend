'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useStore from '@/store/useStore'
import { useCartStore, useFavoritesStore, useCompareStore } from '@store'
import {
  Stack,
  IconButton,
  Popover,
  PopoverTrigger,
  Badge,
  PopoverContent,
  PopoverHeading,
  Icon,
  Button,
} from '@ui'
import styles from './ShopMenu.module.css'

export function ShopMenu() {
  const router = useRouter()
  const cartStore = useStore(useCartStore, state => state)
  const favoritesStore = useStore(useFavoritesStore, state => state)
  const compareStore = useStore(useCompareStore, state => state)
  const [open, setOpen] = useState(false)

  if (!cartStore || !favoritesStore || !compareStore)
    return (
      <Stack direction="row" gap={10}>
        <IconButton size="1.8rem" icon="FiBarChart2" />
        <IconButton icon="BsBookmark" />
        <IconButton icon="BsBag" />
      </Stack>
    )

  const { cartItems, deleteCartItem, totalCost } = cartStore
  const { favoritesItems } = favoritesStore
  const { compareItems } = compareStore

  function deleteCartProduct(id: number) {
    if (cartItems.length === 1) setOpen(false)
    deleteCartItem(id)
  }

  return (
    <Stack direction="row" gap={10}>
      <Badge value={compareItems.length}>
        <IconButton
          size="1.8rem"
          icon="FiBarChart2"
          onClick={() => router.push('/shop/compare')}
        />
      </Badge>
      <Badge value={favoritesItems.length}>
        <IconButton
          icon="BsBookmark"
          onClick={() => router.push('/shop/favorites')}
        />
      </Badge>
      <Popover open={open} onOpenChange={setOpen}>
        <Badge value={cartItems.length}>
          <PopoverTrigger
            onClick={() => (!cartItems.length ? null : setOpen(v => !v))}
          >
            <Icon name="BsBag" />
          </PopoverTrigger>
        </Badge>
        <PopoverContent>
          <PopoverHeading>Cart</PopoverHeading>
          <div className={styles.products}>
            {cartItems?.map(product => (
              <div key={product.id} className={styles.product}>
                <div className={styles.imgContainer}>
                  <Image
                    src={product.imgUrl}
                    alt={product.title}
                    width={80}
                    height={80}
                  />
                </div>
                <div className={styles.info}>
                  <Link
                    href={`/shop/${product.id}`}
                    onClick={() => setOpen(false)}
                  >
                    {product.title}
                  </Link>
                  <div className={styles.cost}>${product.cost}</div>
                  <div className={styles.quantity}>
                    <div className={styles.quantityNumber}>
                      {product.quantity} ea
                    </div>
                    <IconButton
                      icon="BsTrash"
                      size="18"
                      onClick={() => deleteCartProduct(product.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            Cost <span>${totalCost}</span>
          </div>
          <Button
            onClick={() => {
              router.push('/shop/cart')
              setOpen(false)
            }}
            isFullWidth
          >
            Go to cart
          </Button>
          <Button color="secondary" onClick={() => setOpen(false)} isFullWidth>
            Close
          </Button>
        </PopoverContent>
      </Popover>
    </Stack>
  )
}
