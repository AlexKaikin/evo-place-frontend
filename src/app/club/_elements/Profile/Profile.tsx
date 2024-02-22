'use client'

import Image from 'next/image'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth } from '@store'
import { Icon } from '@ui'
import { Settings } from '../Settings/Settings'
import { Subscriptions } from '../Subscriptions/Subscriptions'
import styles from './Profile.module.css'

export function Profile() {
  const { user, update } = useAuth()

  if (!user) {
    return null
  }

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
          <Settings user={user} handleUpdate={update} />
        </div>
        {user.about.length && (
          <div className={styles.item}>
            <span>About</span>
            <div>
              {user.about.split('\n').map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        )}
        {user.interests.length && (
          <div className={styles.item}>
            <span>Interests</span>
            <div>{user.interests.join(', ')}</div>
          </div>
        )}
        {user.location.length && (
          <div className={styles.item}>
            <span>Location</span>
            <div>
              <Icon name="BsGeoAlt" /> {user.location}
            </div>
          </div>
        )}
        <Subscriptions user={user} />
      </div>
    </div>
  )
}
