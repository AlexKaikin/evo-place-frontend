'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { User } from '@/types/auth'
import { Group } from '@/types/club'
import { Typography } from '@/ui'
import defaultUserAvatar from '@assets/img/user/defaultAvatar.png'
import defaultGroupAvatar from '@assets/img/user/users.jpg'
import { useEvents } from '@store'
import styles from './Events.module.css'

export function Events() {
  const [mounted, setMounted] = useState(false)
  const {
    events,
    pagination: { _page, pagesCount },
    getEvents,
    getMore,
    loading,
  } = useEvents()

  const { ref, inView } = useInView({ threshold: 0 })

  function getAvatarUrl(user: User | undefined, group: Group) {
    if (user) {
      return user.avatarUrl ? user.avatarUrl : defaultUserAvatar
    } else {
      return group.avatarUrl ? group.avatarUrl : defaultGroupAvatar
    }
  }

  useEffect(() => {
    if (!mounted) {
      getEvents()
      setMounted(true)
    }
  }, [getEvents, mounted])

  useEffect(() => {
    if (mounted && !loading && inView && _page < pagesCount) {
      getMore()
    }
  })

  return (
    <div className={styles.notes}>
      {events.map(({ _id, user, group, text, created }) => (
        <div key={_id} className={styles.note}>
          <div className={styles.avatar}>
            <Image fill src={getAvatarUrl(user, group)} alt="avatar" />
          </div>
          <div className={styles.content}>
            <div className={styles.name}>
              {user ? (
                <Link href={`/club/users/${user._id}`}>{user.fullName}</Link>
              ) : (
                <Link href={`/club/groups/${group._id}`}>{group.title}</Link>
              )}
            </div>
            <div>
              {text.split('\n').map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
            <div className={styles.time}>
              <Typography variant="tooltip">
                {dayjs(created).format('H:mm, DD.MM.YYYY')}
              </Typography>
            </div>
          </div>
        </div>
      ))}
      <div ref={ref} className={styles.more}></div>
    </div>
  )
}
