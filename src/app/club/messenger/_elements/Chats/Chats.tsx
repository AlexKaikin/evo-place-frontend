'use client'

import { useEffect } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth, useChats } from '@store'
import { Typography } from '@ui'
import styles from './Chats.module.css'

export function Chats() {
  const { chats, getChats, open } = useChats()
  const { user: currentUser } = useAuth()

  useEffect(() => {
    getChats()
  }, [getChats])

  return (
    <div className={styles.chats}>
      {chats.map(room => (
        <div key={room._id} className={styles.chat}>
          {room.users.map(
            user =>
              user._id !== currentUser?._id && (
                <div
                  onClick={() => open(user._id, room._id)}
                  key={user._id}
                  className={styles.container}
                >
                  <div className={styles.avatar}>
                    <Image
                      fill
                      src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <div className={styles.header}>
                      <div className={styles.name}>{user.fullName}</div>
                      <div className={styles.date}>
                        <Typography variant="tooltip">
                          {dayjs(room.updated).format('H:mm')}
                        </Typography>
                      </div>
                    </div>
                    <div className={styles.message}>{room.lastMessage}</div>
                  </div>
                </div>
              )
          )}
        </div>
      ))}
    </div>
  )
}
