'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { SubscriptionsGroup, SubscriptionsUser, User } from '@/types/auth'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { Popover, PopoverContent, PopoverTrigger } from '@ui'
import { getNoun } from '@utils'
import styles from './Subscriptions.module.css'

export function Subscriptions({ user }: { user: User }) {
  const { subscribers, subscriptionsUser, subscriptionsGroup } = user
  const [showSubscriptions, setShowSubscriptions] = useState(false)
  const [showSubscribers, setShowSubscribers] = useState(false)
  const [showGroups, setShowGroups] = useState(false)

  return (
    <div className={styles.subscriptions}>
      {subscribers.length && (
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
      )}

      {subscriptionsUser.length && (
        <Popover open={showSubscriptions} onOpenChange={setShowSubscriptions}>
          <PopoverTrigger
            variant="button"
            onClick={() => setShowSubscriptions(v => !v)}
          >
            <span>{subscriptionsUser.length}</span>{' '}
            {getNoun(subscriptionsUser.length, [
              'subscription',
              'subscriptions',
            ])}
          </PopoverTrigger>
          <PopoverContent>
            <SubscriptionsUser
              users={subscriptionsUser}
              handleClose={() => setShowSubscriptions(false)}
            />
          </PopoverContent>
        </Popover>
      )}

      {subscriptionsGroup.length && (
        <Popover open={showGroups} onOpenChange={setShowGroups}>
          <PopoverTrigger
            variant="button"
            onClick={() => setShowGroups(v => !v)}
          >
            <span>{subscriptionsGroup.length}</span>{' '}
            {getNoun(subscriptionsGroup.length, ['group', 'groups'])}
          </PopoverTrigger>
          <PopoverContent>
            <SubscriptionsGroup
              groups={subscriptionsGroup}
              handleClose={() => setShowGroups(false)}
            />
          </PopoverContent>
        </Popover>
      )}
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
  return (
    <div className={styles.users}>
      {users.map(({ _id, avatarUrl, fullName }) => (
        <Link
          href={`/club/users/${_id}`}
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

function SubscriptionsGroup({
  groups,
  handleClose,
}: {
  groups: SubscriptionsGroup[]
  handleClose: () => void
}) {
  return (
    <div className={styles.groups}>
      {groups.map(({ _id, avatarUrl, title }) => (
        <Link
          href={`/club/groups/${_id}`}
          onClick={handleClose}
          className={styles.group}
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
          <div className={styles.name}>{title}</div>
        </Link>
      ))}
    </div>
  )
}
