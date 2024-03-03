'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { SubscriptionsUser } from '@/types/auth'
import { Group } from '@/types/club'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth } from '@store'
import { Popover, PopoverContent, PopoverTrigger } from '@ui'
import { getNoun } from '@utils'
import styles from './Subscriptions.module.css'

export function Subscriptions({ group }: { group: Group }) {
  const { subscribers } = group

  const [showSubscribers, setShowSubscribers] = useState(false)

  return (
    <div className={styles.subscriptions}>
      {subscribers.length ? (
        <Popover open={showSubscribers} onOpenChange={setShowSubscribers}>
          <PopoverTrigger
            variant="button"
            onClick={() => setShowSubscribers(v => !v)}
          >
            <span>{subscribers.length}</span>{' '}
            {getNoun(subscribers.length, ['subscriber', 'subscribers'])}
          </PopoverTrigger>
          <PopoverContent>
            <SubscriptionsUser
              users={subscribers}
              handleClose={() => setShowSubscribers(false)}
            />
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  )
}

function SubscriptionsUser({
  users,
  handleClose,
}: {
  users: SubscriptionsUser[]
  handleClose: () => void
}) {
  const { user: currentUser } = useAuth()

  return (
    <div className={styles.users}>
      {users.map(({ _id, avatarUrl, fullName }) => (
        <Link
          href={currentUser!._id === _id ? `/club` : `/club/users/${_id}`}
          onClick={handleClose}
          className={styles.user}
          key={_id}
        >
          <div className={styles.avatar}>
            <Image
              fill
              sizes="(max-width: 1800px) 33vw"
              src={avatarUrl ? avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </div>
          <div className={styles.name}>{fullName}</div>
        </Link>
      ))}
    </div>
  )
}
