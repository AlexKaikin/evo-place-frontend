'use client'

import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useRouter, usePathname } from 'next/navigation'
import {
  useCart,
  useFavoriteProducts,
  useCompare,
  useAuth,
  useFavoritePosts,
} from '@store'
import {
  IconButton,
  Stack,
  Icon,
  MenuItem,
  Menu,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ui'
import styles from './Header.module.css'
import { BlogMenu, Logo, Nav, Search, ShopMenu, Theme } from './elements'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [path, setPath] = useState(pathname)
  const [showMenu, setShowMenu] = useState(false)
  const { getCart } = useCart()
  const { getFavoriteProducts } = useFavoriteProducts()
  const { getCompare } = useCompare()
  const { user, logout } = useAuth()
  const { getFavoritePosts } = useFavoritePosts()

  useEffect(() => {
    setShowMenu(false)
    setPath(pathname)
  }, [path, pathname])

  useEffect(() => {
    getCart()
    getFavoriteProducts()
    getCompare()
    getFavoritePosts()
  }, [getCart, getFavoriteProducts, getCompare, getFavoritePosts])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.menuButtonsContainer}>
          <Popover>
            <PopoverTrigger>
              <Icon name="BsSearch" size="17" />
            </PopoverTrigger>
            <PopoverContent>
              <Search />
            </PopoverContent>
          </Popover>
          <IconButton
            icon="BsList"
            className={styles.menuButton}
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
        <div className={cn(styles.menu, { [styles.show]: showMenu })}>
          <div className={styles.menuHeader}>
            <Logo />
            <IconButton icon="BsXLg" onClick={() => setShowMenu(!showMenu)} />
          </div>
          <Nav />
          <div className={styles.desktop}>
            <Search />
            <div className={styles.control}>
              <ShopMenu />
              <BlogMenu />
              <Stack direction="row" gap={20}>
                <Theme />
                {user && <IconButton icon="BsBell" />}
              </Stack>
              <Menu label={<Icon name="BsPersonCircle" />}>
                {user ? (
                  <>
                    <div className={styles.account}>
                      {user.fullName}
                      <span>{user.email}</span>
                    </div>
                    <MenuItem
                      label={'Account'}
                      icon={<Icon name="BsPerson" />}
                      minWidth={150}
                      onClick={() => router.push('/account')}
                    />
                    <MenuItem
                      label={'Logout'}
                      icon={<Icon name="BsBoxArrowRight" />}
                      minWidth={150}
                      onClick={logout}
                    />
                  </>
                ) : (
                  <>
                    <MenuItem
                      label={'Log In'}
                      onClick={() => router.push('/login')}
                    />
                    <MenuItem
                      label={'Sign Up'}
                      onClick={() => router.push('/register')}
                    />
                  </>
                )}
              </Menu>
            </div>
          </div>
          <div className={styles.mobile}>
            <Stack gap={10}>
              {user ? (
                <>
                  <Button
                    isFullWidth
                    color="secondary"
                    onClick={() => router.push('/account')}
                  >
                    Account
                  </Button>
                  <Button isFullWidth color="secondary" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button isFullWidth onClick={() => router.push('/register')}>
                    Sign Up
                  </Button>
                  <Button
                    color="secondary"
                    isFullWidth
                    onClick={() => router.push('/login')}
                  >
                    Log In
                  </Button>
                </>
              )}
            </Stack>
            <Stack direction="row" justifyContent="center" gap={20}>
              {user && <IconButton icon="BsBell" />}
              <Theme />
            </Stack>
          </div>
        </div>
      </div>
    </header>
  )
}
