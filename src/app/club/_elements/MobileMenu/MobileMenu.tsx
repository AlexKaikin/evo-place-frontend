'use client'

import { useRouter } from 'next/navigation'
import { IconButton } from '@ui'
import styles from './MobileMenu.module.css'

export function MobileMenu() {
  const router = useRouter()

  return (
    <div className={styles.mobileMenu}>
      <IconButton icon="BsPerson" onClick={() => router.push(`/club`)} />
      <IconButton
        icon="BsChatText"
        onClick={() => router.push(`/club/messenger`)}
      />
      <IconButton
        icon="BsFlag"
        size="1.3rem"
        onClick={() => router.push(`/club/groups`)}
      />
      <IconButton icon="BsPeople" onClick={() => router.push(`/club/users`)} />
      <IconButton
        icon="BsMegaphone"
        onClick={() => router.push(`/club/events`)}
      />
    </div>
  )
}
