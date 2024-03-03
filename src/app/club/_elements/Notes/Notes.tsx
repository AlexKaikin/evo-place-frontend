'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { NoteList } from '@/app/club/_elements'
import { User } from '@/types/auth'
import { Group } from '@/types/club'
import { useAuth, useNotes } from '@store'
import styles from './Notes.module.css'

type Props = {
  user?: User
  group?: Group
}

export function Notes({ user: userProp, group: groupProp }: Props) {
  const [author, setAuthor] = useState<User | Group | null>(null)
  const [mounted, setMounted] = useState(false)
  const { user: currentUser } = useAuth()
  const {
    notes,
    pagination: { _page, pagesCount },
    getNotes,
    getNotesMore,
    deleteNote,
    loading,
  } = useNotes()

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (userProp) setAuthor(userProp)
    else if (groupProp) setAuthor(groupProp)
    else setAuthor(currentUser)
  }, [currentUser, groupProp, userProp])

  useEffect(() => {
    if (!mounted && author) {
      getNotes(author._id, groupProp ? 'group' : 'user')
      setMounted(true)
    }
  }, [getNotes, notes, mounted, author, groupProp])

  useEffect(() => {
    if (mounted && !loading && inView && _page < pagesCount) {
      getNotesMore(author!._id, groupProp ? 'group' : 'user')
    }
  })

  return (
    <div className={styles.notes}>
      <NoteList notes={notes} deleteNote={deleteNote} />
      <div ref={ref} className={styles.more}></div>
    </div>
  )
}
