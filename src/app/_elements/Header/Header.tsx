'use client'

import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useRouter, usePathname } from 'next/navigation'
import { useCart, useFavorites, useCompare, useAuth } from '@store'
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
import { Logo, Nav, Search, ShopMenu, Theme } from './elements'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [path, setPath] = useState(pathname)
  const [showMenu, setShowMenu] = useState(false)
  const { getCart } = useCart()
  const { getFavorites } = useFavorites()
  const { getCompare } = useCompare()
  const { user, logout } = useAuth()

  useEffect(() => {
    setShowMenu(false)
    setPath(pathname)
  }, [path, pathname])

  useEffect(() => {
    getCart()
    getFavorites()
    getCompare()
  }, [getCart, getFavorites, getCompare])

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
              <Stack direction="row" gap={20}>
                <Theme />
                {user && <IconButton icon="BsBell" />}
              </Stack>
              <Menu label={<Icon name="BsPerson" />}>
                {user ? (
                  <Button isFullWidth color="secondary" onClick={logout}>
                    Logout
                  </Button>
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
                <Button isFullWidth color="secondary" onClick={logout}>
                  Logout
                </Button>
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
