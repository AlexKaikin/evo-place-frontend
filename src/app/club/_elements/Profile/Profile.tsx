'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { User } from '@/types/auth'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth } from '@store'
import { Button, Icon } from '@ui'
import { Settings } from '../Settings/Settings'
import { Subscriptions } from '../Subscriptions/Subscriptions'
import styles from './Profile.module.css'

type Props = { user?: User }

export function Profile({ user: userProp }: Props) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const { user: currentUser, update } = useAuth()
  const isFollow = user?.subscriptionsUser.find(
    item => item.id === currentUser?.id
  )

  useEffect(() => {
    if (userProp) setUser(userProp)
    else setUser(currentUser)
  }, [currentUser, userProp])

  if (!user) return null
  if (userProp && userProp._id === currentUser?._id) router.push('/club')

  return (
    <div className={styles.column}>
      <div className={styles.avatar}>
        <Image
          fill
          sizes="(max-width: 1800px) 50vw"
          src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
          alt="avatar"
        />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.infoHeader}>
          <div className={styles.nicname}>{user.fullName}</div>
          {!userProp && <Settings user={user} handleUpdate={update} />}
        </div>
        {user.about.length ? (
          <div className={styles.item}>
            <span>About</span>
            <div>
              {user.about.split('\n').map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        ) : null}
        {user.interests.length ? (
          <div className={styles.item}>
            <span>Interests</span>
            <div>{user.interests.join(', ')}</div>
          </div>
        ) : null}
        {user.location.length ? (
          <div className={styles.item}>
            <span>Location</span>
            <div>
              <Icon name="BsGeoAlt" /> {user.location}
            </div>
          </div>
        ) : null}
        <Subscriptions user={user} />
        {userProp ? (
          isFollow ? (
            <Button variant="outlined">Unsubscribe</Button>
          ) : (
            <Button>Subscribe</Button>
          )
        ) : null}
      </div>
    </div>
  )
}
