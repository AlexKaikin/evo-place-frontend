'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { SubscriptionsGroup, SubscriptionsUser, User } from '@/types/auth'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { useOnClickOutside } from '@hooks'
import { getNoun } from '@utils'
import styles from './Subscriptions.module.css'

export function Subscriptions({ user }: { user: User }) {
  const { subscribers, subscriptionsUser, subscriptionsGroup } = user
  const subscriptionsUserRef = useRef<HTMLDivElement>(null)
  const subscriptionsGroupRef = useRef<HTMLDivElement>(null)
  const subscribersRef = useRef<HTMLDivElement>(null)
  const [showSubscribers, setShowSubscribers] = useState<boolean>(false)
  const [showSubscriptionsUser, setShowSubscriptionsUser] =
    useState<boolean>(false)
  const [showSubscriptionsGroup, setShowSubscriptionsGroup] =
    useState<boolean>(false)

  useOnClickOutside(subscriptionsUserRef, () => setShowSubscriptionsUser(false))
  useOnClickOutside(subscriptionsGroupRef, () =>
    setShowSubscriptionsGroup(false)
  )
  useOnClickOutside(subscribersRef, () => setShowSubscribers(false))

  function showSubscriptionsUserChange() {
    if (showSubscriptionsUser) setShowSubscriptionsUser(false)
    else setShowSubscriptionsUser(true)
  }

  function showSubscriptionsGroupChange() {
    if (showSubscriptionsGroup) setShowSubscriptionsGroup(false)
    else setShowSubscriptionsGroup(true)
  }

  function showSubscribersChange() {
    if (showSubscribers) setShowSubscribers(false)
    else setShowSubscribers(true)
  }

  return (
    <div className={styles.subscriptions}>
      {subscribers.length && (
        <div
          ref={subscribersRef}
          onClick={showSubscribersChange}
          className={styles.item}
        >
          <span>{subscribers.length}</span>{' '}
          {getNoun(subscribers.length, ['subscriber', 'subscribers'])}
          {showSubscribers && <SubscriptionsUser users={subscribers} />}
        </div>
      )}

      {subscriptionsUser.length && (
        <div
          ref={subscriptionsUserRef}
          onClick={showSubscriptionsUserChange}
          className={styles.item}
        >
          <span>{subscriptionsUser.length}</span>{' '}
          {getNoun(subscriptionsUser.length, ['subscription', 'subscriptions'])}
          {showSubscriptionsUser && (
            <SubscriptionsUser users={subscriptionsUser} />
          )}
        </div>
      )}

      {subscriptionsGroup.length && (
        <div
          ref={subscriptionsGroupRef}
          onClick={showSubscriptionsGroupChange}
          className={styles.item}
        >
          <span>{subscriptionsGroup.length}</span>{' '}
          {getNoun(subscriptionsGroup.length, ['group', 'groups'])}
          {showSubscriptionsGroup && (
            <SubscriptionsGroup groups={subscriptionsGroup} />
          )}
        </div>
      )}
    </div>
  )
}

function SubscriptionsUser({ users }: { users: SubscriptionsUser[] }) {
  return (
    <div className={styles.users}>
      {users.map(({ _id, avatarUrl, fullName }) => (
        <Link href={`/club/users/${_id}`} className={styles.user} key={_id}>
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

function SubscriptionsGroup({ groups }: { groups: SubscriptionsGroup[] }) {
  return (
    <div className={styles.groups}>
      {groups.map(({ _id, avatarUrl, title }) => (
        <Link href={`/club/groups/${_id}`} className={styles.group} key={_id}>
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
