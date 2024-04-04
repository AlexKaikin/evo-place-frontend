'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useCart, useFavoriteProducts, useCompare, useLangs } from '@store'
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
  const pathname = usePathname()
  const cartStore = useCart()
  const { lang, translate } = useLangs()
  const favoritesStore = useFavoriteProducts()
  const compareStore = useCompare()
  const [open, setOpen] = useState(false)

  if (pathname.split('/')[1] !== 'shop') return null

  if (!cartStore || !favoritesStore || !compareStore)
    return (
      <Stack direction="row" gap={10}>
        <IconButton size="1.5rem" icon="FiBarChart2" />
        <IconButton size="1.2rem" icon="BsBookmark" />
        <IconButton size="1.2rem" icon="BsBag" />
      </Stack>
    )

  const { cartItems, deleteCartItem, totalCost } = cartStore
  const { favoritesItems } = favoritesStore
  const { compareItems } = compareStore

  function deleteCartProduct(id: string) {
    if (cartItems.length === 1) setOpen(false)
    deleteCartItem(id)
  }

  return (
    <Stack direction="row" gap={5}>
      <Badge
        value={compareItems.length}
        onClick={() =>
          compareItems.length ? router.push('/shop/compare') : null
        }
      >
        <IconButton size="1.5rem" icon="FiBarChart2" />
      </Badge>
      <Badge
        value={favoritesItems.length}
        onClick={() =>
          favoritesItems.length ? router.push('/shop/favorites') : null
        }
      >
        <IconButton size="1.2rem" icon="BsBookmark" />
      </Badge>
      <Popover open={open} onOpenChange={setOpen}>
        <Badge
          value={cartItems.length}
          onClick={() => (!cartItems.length ? null : setOpen(v => !v))}
        >
          <PopoverTrigger>
            <Icon size="1.2rem" name="BsBag" />
          </PopoverTrigger>
        </Badge>
        <PopoverContent>
          <PopoverHeading>
            {translate[lang].header.shopMenu.cart}
          </PopoverHeading>
          <div className={styles.products}>
            {cartItems?.map(product => (
              <div key={product._id} className={styles.product}>
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
                    href={`/shop/${product.category}/${product._id}`}
                    onClick={() => setOpen(false)}
                  >
                    {product.title}
                  </Link>
                  <div className={styles.cost}>${product.cost}</div>
                  <div className={styles.quantity}>
                    <div className={styles.quantityNumber}>
                      {product.quantity} {translate[lang].header.shopMenu.ea}
                    </div>
                    <IconButton
                      icon="BsTrash"
                      size="18"
                      onClick={() => deleteCartProduct(product._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {translate[lang].header.shopMenu.cost} <span>${totalCost}</span>
          </div>
          <Button
            onClick={() => {
              router.push('/shop/cart')
              setOpen(false)
            }}
            isFullWidth
          >
            {translate[lang].header.shopMenu.goToCart}
          </Button>
          <Button color="secondary" onClick={() => setOpen(false)} isFullWidth>
            {translate[lang].header.shopMenu.close}
          </Button>
        </PopoverContent>
      </Popover>
    </Stack>
  )
}
