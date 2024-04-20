'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useParams, usePathname } from 'next/navigation'
import { useCart, useFavoriteProducts, useCompare, useLangs } from '@store'
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
  const { lang, translate } = useLangs()
  const params = useParams<{ productId?: string; category?: string }>()
  const category = params?.category || null
  const cartStore = useCart()
  const favoritesStore = useFavoriteProducts()
  const compareStore = useCompare()
  const [open, setOpen] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const pathname = usePathname()
  const pathnameLenght = pathname.split('/').length
  const isCatalog = pathnameLenght === 2 || (pathnameLenght === 3 && !!category)

  if (!cartStore || !favoritesStore || !compareStore)
    return (
      <div className={styles.mobileMenu}>
        <div className={styles.item}>
          <Menu variant="text" label={<Icon name="BsGrid" />}></Menu>
          <label>{translate[lang].shop.mobileMenu.menu}</label>
        </div>
        {isCatalog && (
          <>
            <div className={styles.item}>
              <Menu variant="text" label={<Icon name="BsSortDown" />}></Menu>
              <label>{translate[lang].shop.mobileMenu.sort}</label>
            </div>
            <div className={styles.item}>
              <Menu variant="text" label={<Icon name="BsFunnel" />}></Menu>
              <label>{translate[lang].shop.mobileMenu.filter}</label>
            </div>
          </>
        )}
        <div className={styles.item}>
          <Menu variant="text" label={<Icon name="FiBarChart2" />}></Menu>
          <label>{translate[lang].shop.mobileMenu.compare}</label>
        </div>
        <div className={styles.item}>
          <Menu variant="text" label={<Icon name="BsBookmark" />}></Menu>
          <label>{translate[lang].shop.mobileMenu.favorites}</label>
        </div>
        <div className={styles.item}>
          <Menu variant="text" label={<Icon name="BsBag" />}></Menu>
          <label>{translate[lang].shop.mobileMenu.cart}</label>
        </div>
      </div>
    )

  const { cartItems, deleteCartItem, totalCost } = cartStore
  const { favoritesItems } = favoritesStore
  const { compareItems } = compareStore

  const changeCategory = (category: string | null) => {
    category ? router.push(`/shop/${category}`) : router.push(`/shop`)
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
      <div className={styles.item}>
        <Menu variant="text" label={<Icon name="BsGrid" />}>
          <MenuItem
            label="All"
            action={() => changeCategory(null)}
            color={
              category === null && !params?.productId ? 'primary' : 'secondary'
            }
          />

          <MenuItem
            label="Tea"
            action={() => changeCategory('tea')}
            color={category === 'tea' ? 'primary' : 'secondary'}
          />
          <MenuItem
            label="Coffee"
            action={() => changeCategory('coffee')}
            color={category === 'coffee' ? 'primary' : 'secondary'}
          />
          <MenuItem
            label="Spices"
            action={() => changeCategory('spices')}
            color={category === 'spices' ? 'primary' : 'secondary'}
          />
          <MenuItem
            label="Seeds"
            action={() => changeCategory('seeds')}
            color={category === 'seeds' ? 'primary' : 'secondary'}
          />
        </Menu>
        <label>{translate[lang].shop.mobileMenu.menu}</label>
      </div>
      {isCatalog && (
        <>
          <div className={styles.item}>
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
            <label>{translate[lang].shop.mobileMenu.sort}</label>
          </div>

          <Popover open={openFilter} onOpenChange={setOpenFilter}>
            <div className={styles.item}>
              <PopoverTrigger
                variant="icon"
                onClick={() => setOpenFilter(v => !v)}
              >
                <Icon name="BsFunnel" />
              </PopoverTrigger>
              <label>{translate[lang].shop.mobileMenu.filter}</label>
            </div>
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
        </>
      )}

      <Badge
        variant="dot"
        value={compareItems.length}
        onClick={() =>
          compareItems.length ? router.push('/shop/compare') : null
        }
      >
        <div className={styles.item}>
          <Menu variant="text" label={<Icon name="FiBarChart2" />}></Menu>

          <label>{translate[lang].shop.mobileMenu.compare}</label>
        </div>
      </Badge>

      <Badge
        variant="dot"
        value={favoritesItems.length}
        onClick={() =>
          favoritesItems.length ? router.push('/shop/favorites') : null
        }
      >
        <div className={styles.item}>
          <Menu variant="text" label={<Icon name="BsBookmark" />}></Menu>
          <label>{translate[lang].shop.mobileMenu.favorites}</label>
        </div>
      </Badge>

      <Popover open={open} onOpenChange={setOpen}>
        <Badge
          variant="dot"
          value={cartItems.length}
          onClick={() => (!cartItems.length ? null : setOpen(v => !v))}
        >
          <div className={styles.item}>
            <PopoverTrigger variant="icon">
              <Icon name="BsBag" />
            </PopoverTrigger>
            <label>{translate[lang].shop.mobileMenu.cart}</label>
          </div>
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
    </div>
  )
}
