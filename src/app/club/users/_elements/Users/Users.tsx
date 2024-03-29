'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { useUsers } from '@store'
import styles from './Users.module.css'

export function Users() {
  const [mounted, setMounted] = useState(false)
  const {
    users,
    getUsers,
    getUsersMore,
    pagination: { _page, pagesCount },
    loading,
  } = useUsers()
  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (!mounted) {
      getUsers()
      setMounted(true)
    }
  }, [getUsers, mounted])

  useEffect(() => {
    if (mounted && !loading && inView && _page < pagesCount) getUsersMore()
  })

  if (!users.length && !loading) return <>User not found</>

  return (
    <div className={styles.users}>
      {users.map(({ _id, fullName, avatarUrl }) => (
        <Link href={`/club/users/${_id}`} key={_id} className={styles.user}>
          <div className={styles.imgContainer}>
            <Image
              fill
              src={avatarUrl ? avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </div>
          <div className={styles.name}>{fullName}</div>
        </Link>
      ))}
      <div ref={ref} className={styles.more}></div>
    </div>
  )
}
