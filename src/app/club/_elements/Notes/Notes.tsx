'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import dayjs from 'dayjs'
import Image from 'next/image'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth, useNotes } from '@store'
import { IconButton, Typography } from '@ui'
import styles from './Notes.module.css'

export function Notes() {
  const [mounted, setMounted] = useState(false)
  const { user } = useAuth()
  const {
    notes,
    pagination,
    getNotesUser,
    getNotesUserMore,
    deleteNote,
    setNotesPage,
    loading,
  } = useNotes()

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (
      mounted &&
      !loading &&
      inView &&
      pagination.currentPage < pagination.pagesCount
    ) {
      setNotesPage(pagination.currentPage + 1)
      getNotesUserMore(user!._id)
    }
  })

  useEffect(() => {
    !mounted && getNotesUser(user!._id)
    setMounted(true)
  }, [getNotesUser, notes, mounted, user])

  return (
    <div className={styles.notes}>
      {notes.map(({ user, _id, text, created }) => (
        <div key={_id} className={styles.note}>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <Image
                fill
                sizes="(max-width: 1800px) 33vw"
                src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
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
                  {dayjs(created).format('H:m, DD.MM.YYYY')}
                </Typography>
              </div>
            </div>
          </div>
          <div className={styles.control}>
            <IconButton icon="BsTrash3" onClick={() => deleteNote(_id)} />
          </div>
        </div>
      ))}
      <div ref={ref} className={styles.more}></div>
    </div>
  )
}
