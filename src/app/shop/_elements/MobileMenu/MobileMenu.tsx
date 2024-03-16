'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { useCart, useFavoriteProducts, useCompare } from '@store'
import {
  Menu,
  Icon,
  MenuItem,
  Badge,
  IconButton,
  Button,
  Popover,
  PopoverContent,
  PopoverHeading,
  PopoverTrigger,
} from '@ui'
import { scrollToTop } from '@utils'
import { Filtration } from '..'
import styles from './MobileMenu.module.css'

export function MobileMenu() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ productId?: string }>()
  const currentCategory = searchParams.get('category')
  const cartStore = useCart()
  const favoritesStore = useFavoriteProducts()
  const compareStore = useCompare()
  const [open, setOpen] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)

  if (!cartStore || !favoritesStore || !compareStore)
    return (
      <div className={styles.mobileMenu}>
        <IconButton icon="BsGrid" />
        <IconButton icon="BsSortDown" />
        <IconButton icon="BsFunnel" />
        <IconButton icon="FiBarChart2" />
        <IconButton icon="BsBookmark" />
        <IconButton icon="BsBag" />
      </div>
    )

  const { cartItems, deleteCartItem, totalCost } = cartStore
  const { favoritesItems } = favoritesStore
  const { compareItems } = compareStore

  const changeCategory = (category: string | null) => {
    category ? router.push(`/shop?category=${category}`) : router.push(`/shop`)
    scrollToTop()
  }

  function changeSortActive(item: string) {
    let queryParams
    let _sort = ''
    let _order = ''

    if (item === 'priceDecrease') {
      _sort = 'price'
      _order = 'desc'
    } else if (item === 'priceIncrease') {
      _sort = 'price'
      _order = 'asc'
    } else if (item === 'pop') {
      _sort = 'rating'
      _order = 'desc'
    } else {
      _sort = 'id'
      _order = 'desc'
    }

    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)

      if (queryParams.has('_sort')) {
        queryParams.set('_sort', _sort)
        queryParams.set('_order', _order)
      } else {
        queryParams.append('_sort', _sort)
        queryParams.append('_order', _order)
      }

      if (queryParams.has('_page')) {
        queryParams.set('_page', String(1))
      }
    }
    const path = '/shop' + '?' + queryParams?.toString()
    router.push(path)
    scrollToTop()
  }

  function deleteCartProduct(id: string) {
    if (cartItems.length === 1) setOpen(false)
    deleteCartItem(id)
  }

  return (
    <div className={styles.mobileMenu}>
      <Menu variant="text" label={<Icon name="BsGrid" />}>
        <MenuItem
          label="All"
          action={() => changeCategory(null)}
          color={
            currentCategory === null && !params?.productId
              ? 'primary'
              : 'secondary'
          }
        />
        <MenuItem
          label="Tea"
          action={() => changeCategory('Tea')}
          color={currentCategory === 'Tea' ? 'primary' : 'secondary'}
        />
        <MenuItem
          label="Coffee"
          action={() => changeCategory('Coffee')}
          color={currentCategory === 'Coffee' ? 'primary' : 'secondary'}
        />
        <MenuItem
          label="Spices"
          action={() => changeCategory('Spices')}
          color={currentCategory === 'Spices' ? 'primary' : 'secondary'}
        />
        <MenuItem
          label="Seeds"
          action={() => changeCategory('Seeds')}
          color={currentCategory === 'Seeds' ? 'primary' : 'secondary'}
        />
      </Menu>
      <Menu variant="text" label={<Icon name="BsSortDown" />}>
        <MenuItem label="new" onClick={() => changeSortActive('new')} />
        <MenuItem label="pop" onClick={() => changeSortActive('pop')} />
        <MenuItem
          label="price asc"
          onClick={() => changeSortActive('priceIncrease')}
        />
        <MenuItem
          label="price desc"
          onClick={() => changeSortActive('priceDecrease')}
        />
      </Menu>

      <Popover open={openFilter} onOpenChange={setOpenFilter}>
        <PopoverTrigger variant="icon" onClick={() => setOpenFilter(v => !v)}>
          <Icon name="BsFunnel" />
        </PopoverTrigger>
        <PopoverContent>
          <div className={styles.filterContainer}>
            <Filtration action={() => setOpenFilter(false)} />
            <Button
              color="secondary"
              onClick={() => setOpenFilter(false)}
              isFullWidth
            >
              Close
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Badge
        value={compareItems.length}
        onClick={() =>
          compareItems.length ? router.push('/shop/compare') : null
        }
      >
        <IconButton size="1.8rem" icon="FiBarChart2" />
      </Badge>
      <Badge
        value={favoritesItems.length}
        onClick={() =>
          favoritesItems.length ? router.push('/shop/favorites') : null
        }
      >
        <IconButton icon="BsBookmark" />
      </Badge>
      <Popover open={open} onOpenChange={setOpen}>
        <Badge
          value={cartItems.length}
          onClick={() => (!cartItems.length ? null : setOpen(v => !v))}
        >
          <PopoverTrigger>
            <Icon name="BsBag" />
          </PopoverTrigger>
        </Badge>
        <PopoverContent>
          <PopoverHeading>Cart</PopoverHeading>
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
                    href={`/shop/${product._id}`}
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
                      onClick={() => deleteCartProduct(product._id)}
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
    </div>
  )
}
