'use client'

import { useRouter } from 'next/navigation'
import { useLangs } from '@store'
import { Icon, Menu } from '@ui'
import styles from './MobileMenu.module.css'

export function MobileMenu() {
  const router = useRouter()
  const { lang, translate } = useLangs()

  return (
    <div className={styles.mobileMenu}>
      <div className={styles.item}>
        <Menu
          variant="text"
          label={<Icon name="BsPerson" />}
          onClick={() => router.push(`/club`)}
        ></Menu>
        <label>{translate[lang].club.mobileMenu.myPage}</label>
      </div>
      <div className={styles.item}>
        <Menu
          variant="text"
          label={<Icon name="BsChatText" />}
          onClick={() => router.push(`/club/messenger`)}
        ></Menu>
        <label>{translate[lang].club.mobileMenu.messenger}</label>
      </div>
      <div className={styles.item}>
        <Menu
          variant="text"
          label={<Icon name="BsFlag" size="20" />}
          onClick={() => router.push(`/club/groups`)}
        ></Menu>
        <label>{translate[lang].club.mobileMenu.groups}</label>
      </div>
      <div className={styles.item}>
        <Menu
          variant="text"
          label={<Icon name="BsPeople" />}
          onClick={() => router.push(`/club/users`)}
        ></Menu>
        <label>{translate[lang].club.mobileMenu.users}</label>
      </div>
      <div className={styles.item}>
        <Menu
          variant="text"
          label={<Icon name="BsMegaphone" />}
          onClick={() => router.push(`/club/events`)}
        ></Menu>
        <label>{translate[lang].club.mobileMenu.events}</label>
      </div>
    </div>
  )
}
