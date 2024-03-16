'use client'

import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@store'
import {
  IconButton,
  Stack,
  Icon,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ui'
import styles from './Header.module.css'
import {
  Account,
  BlogMenu,
  Lang,
  Logo,
  Nav,
  Search,
  ShopMenu,
  Theme,
} from './elements'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    setShowMenu(false)
  }, [pathname])

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
              <Stack direction="row" gap={10}>
                <Lang />
                <Theme />
                {user && <IconButton size="1.2rem" icon="BsBell" />}
              </Stack>
              <Account />
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
              <Lang />
            </Stack>
          </div>
        </div>
      </div>
    </header>
  )
}
