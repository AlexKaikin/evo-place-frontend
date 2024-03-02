'use client'

import Image from 'next/image'
import { Group } from '@/types/club'
import defaultAvatar from '@assets/img/user/users.jpg'
import { useAuth, useGroups } from '@store'
import { Icon } from '@ui'
import { Settings } from '../Settings/Settings'
import { Subscriptions } from '../Subscriptions/Subscriptions'
import styles from './Profile.module.css'

type Props = {
  group: Group
}

export function Profile({ group }: Props) {
  const { avatarUrl, title, about, location } = group
  const { update, deleteGroup } = useGroups()
  const { user } = useAuth()
  const isAuthor = user?._id === group.creator

  return (
    <div className={styles.column}>
      <div className={styles.avatar}>
        <Image
          fill
          sizes="(max-width: 1800px) 50vw"
          src={avatarUrl ? avatarUrl : defaultAvatar}
          alt="avatar"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.infoHeader}>
          <div className={styles.title}>{title}</div>
          {isAuthor ? (
            <Settings
              group={group}
              handleUpdate={update}
              handleDelete={deleteGroup}
            />
          ) : null}
        </div>
        {about.length ? (
          <div className={styles.item}>
            <span>About</span>
            <div>
              {about.split('\n').map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        ) : null}

        {location.length ? (
          <div className={styles.item}>
            <span>Location</span>
            <div>
              <Icon name="BsGeoAlt" /> {location}
            </div>
          </div>
        ) : null}
        <Subscriptions group={group} />
      </div>
    </div>
  )
}
