'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import { Note } from '@/types/club'
import defaultUserAvatar from '@assets/img/user/defaultAvatar.png'
import defaultGroupAvatar from '@assets/img/user/users.jpg'
import { useAuth } from '@store'
import { IconButton, Typography } from '@ui'
import styles from './NoteList.module.css'

type Props = {
  notes: Note[]
  deleteNote: (id: string) => void
}

export function NoteList({ notes, deleteNote }: Props) {
  const { user: currentUser } = useAuth()

  function getAvatarUrl(user: Note['user'], group: Note['group']) {
    if (group) {
      return group.avatarUrl ? group.avatarUrl : defaultGroupAvatar
    } else {
      return user.avatarUrl ? user.avatarUrl : defaultUserAvatar
    }
  }

  function getAuthorId(user: Note['user'], group: Note['group']) {
    if (group) {
      return group.creator
    } else {
      return user._id
    }
  }

  return (
    <>
      {notes.map(({ user, group, _id, text, created }) => (
        <div key={_id} className={styles.note}>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <Image
                fill
                sizes="(max-width: 1800px) 33vw"
                src={getAvatarUrl(user, group)}
                alt="avatar"
              />
            </div>
            <div className={styles.content}>
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
          {getAuthorId(user, group) === currentUser?._id ? (
            <div className={styles.control}>
              <IconButton
                size="17"
                icon="BsTrash3"
                onClick={() => deleteNote(_id)}
              />
            </div>
          ) : null}
        </div>
      ))}
    </>
  )
}
