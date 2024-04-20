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
          onClick={() => router.push('/account')}
        ></Menu>
        <label>{translate[lang].account.mobileMenu.profile}</label>
      </div>
      <div className={styles.item}>
        <Menu
          variant="text"
          label={<Icon name="BsBag" />}
          onClick={() => router.push('/account/orders')}
        ></Menu>
        <label>{translate[lang].account.mobileMenu.orders}</label>
      </div>
      <div className={styles.item}>
        <Menu
          variant="text"
          label={<Icon name="BsStarHalf" />}
          onClick={() => router.push('/account/reviews')}
        ></Menu>
        <label>{translate[lang].account.mobileMenu.reviews}</label>
      </div>
      <div className={styles.item}>
        <Menu
          variant="text"
          label={<Icon name="BsChatLeftText" />}
          onClick={() => router.push('/account/comments')}
        ></Menu>
        <label>{translate[lang].account.mobileMenu.comments}</label>
      </div>
    </div>
  )
}
