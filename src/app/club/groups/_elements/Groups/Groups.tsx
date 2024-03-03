'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import defaultAvatar from '@assets/img/user/users.jpg'
import { useGroups } from '@store'
import styles from './Groups.module.css'

export function Groups() {
  const [mounted, setMounted] = useState(false)
  const {
    groups,
    getGroups,
    getGroupsMore,
    pagination: { _page, pagesCount },
    loading,
  } = useGroups()
  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (!mounted) {
      getGroups()
      setMounted(true)
    }
  }, [getGroups, mounted])

  useEffect(() => {
    if (mounted && !loading && inView && _page < pagesCount) getGroupsMore()
  })

  if (!groups.length && !loading) return <>Group not found</>

  return (
    <div className={styles.groups}>
      {groups.map(({ _id, avatarUrl, title }) => (
        <Link href={`/club/groups/${_id}`} key={_id} className={styles.group}>
          <div className={styles.imgContainer}>
            <Image
              fill
              src={avatarUrl ? avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </div>
          <div className={styles.title}>{title}</div>
        </Link>
      ))}
      <div ref={ref} className={styles.more}></div>
    </div>
  )
}
