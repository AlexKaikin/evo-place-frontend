'use client'

import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useRouter, usePathname } from 'next/navigation'
import { useMediaQuery } from '@hooks'
import { useAuth, useLangs } from '@store'
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
  const { lang, translate } = useLangs()
  const isMedia1180 = useMediaQuery(1180)

  useEffect(() => {
    if (showMenu) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [showMenu])

  useEffect(() => {
    setShowMenu(false)
  }, [pathname])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {!isMedia1180 ? (
          <div className={styles.desktop}>
            <Logo />
            <Nav />
            <Stack direction="row" gap={40} alignItems="center">
              <Search />
              <ShopMenu />
              <BlogMenu />
              <Stack direction="row" gap={10}>
                <Lang />
                <Theme />
                {user && <IconButton size="1.2rem" icon="BsBell" />}
              </Stack>
              <Account />
            </Stack>
          </div>
        ) : (
          <div className={styles.mobile}>
            <IconButton
              icon={showMenu ? 'BsXLg' : 'BsList'}
              className={styles.menuButton}
              onClick={() => setShowMenu(!showMenu)}
            />
            <Logo />
            <Popover>
              <PopoverTrigger>
                <Icon name="BsSearch" size="17" />
              </PopoverTrigger>
              <PopoverContent>
                <Search />
              </PopoverContent>
            </Popover>

            <div className={cn(styles.menu, { [styles.show]: showMenu })}>
              <Nav />
              <Stack gap={10}>
                {user ? (
                  <>
                    <Button
                      isFullWidth
                      color="secondary"
                      onClick={() => router.push('/account')}
                    >
                      {translate[lang].header.account.account}
                    </Button>
                    <Button isFullWidth color="secondary" onClick={logout}>
                      {translate[lang].header.account.logout}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      isFullWidth
                      onClick={() => router.push('/register')}
                    >
                      {translate[lang].header.account.register}
                    </Button>
                    <Button
                      color="secondary"
                      isFullWidth
                      onClick={() => router.push('/login')}
                    >
                      {translate[lang].header.account.login}
                    </Button>
                  </>
                )}
              </Stack>
              <Stack direction="row" justifyContent="center" gap={20}>
                <Lang />
                <Theme />
                {user && <IconButton icon="BsBell" size="1.2rem" />}
              </Stack>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
