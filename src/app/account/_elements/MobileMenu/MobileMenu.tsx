'use client'

import { useRouter } from 'next/navigation'
import { IconButton } from '@ui'
import styles from './MobileMenu.module.css'

export function MobileMenu() {
  const router = useRouter()

  return (
    <div className={styles.mobileMenu}>
      <IconButton icon="BsPerson" onClick={() => router.push('/account')} />
      <IconButton icon="BsBag" onClick={() => router.push('/account/orders')} />
      <IconButton
        icon="BsStarHalf"
        onClick={() => router.push('/account/reviews')}
      />
      <IconButton
        icon="BsChatLeftText"
        onClick={() => router.push('/account/comments')}
      />
    </div>
  )
}
