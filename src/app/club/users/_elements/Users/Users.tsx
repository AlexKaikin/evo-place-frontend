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
  const { users, getUsers, getUsersMore, setUsersPage, pagination, loading } =
    useUsers()
  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    getUsers()
    setMounted(true)
  }, [getUsers])

  useEffect(() => {
    if (
      mounted &&
      !loading &&
      inView &&
      pagination.currentPage < pagination.pagesCount
    ) {
      setUsersPage(pagination.currentPage + 1)
      getUsersMore()
    }
  })

  if (!users.length) return <>User not found</>

  return (
    <div className={styles.users}>
      {users.map(user => (
        <Link
          href={`/club/users/${user._id}`}
          key={user._id}
          className={styles.user}
        >
          <div className={styles.imgContainer}>
            <Image
              fill
              src={user?.avatarUrl ? user.avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </div>
          <div className={styles.name}>{user.fullName}</div>
        </Link>
      ))}
      <div ref={ref} className={styles.more}></div>
    </div>
  )
}
