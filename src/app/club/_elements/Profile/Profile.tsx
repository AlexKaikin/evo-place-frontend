'use client'

import Image from 'next/image'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth } from '@store'
import { Icon } from '@ui'
import styles from './Profile.module.css'

export function Profile() {
  const { user } = useAuth()

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
          {/* <MyPageSettings /> */}
        </div>
        <div className={styles.item}>
          <span>About</span>
          <div>
            {user.about.split('\n').map((item: string, i: number) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </div>
        {user.interests.length && (
          <div className={styles.item}>
            <span>Interests</span>
            <div>
              {user.interests.map(item => (
                <div key={item}>
                  <span>#</span>
                  {item}
                </div>
              ))}
            </div>
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
        {/* <Subscribers myProfile={user} /> */}
      </div>
    </div>
  )
}
