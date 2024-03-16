'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User } from '@/types/auth'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { useDebounce } from '@hooks'
import { chatService } from '@services'
import { useAuth } from '@store'
import { Input, Popover, PopoverContent, PopoverTrigger } from '@ui'
import styles from './Search.module.css'

export function Search() {
  const [nameDebounce, setNameDebounce] = useState('')
  const debouncedValue = useDebounce(nameDebounce, 2000)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function getUsers() {
      const { data } = await chatService.getUsers(debouncedValue)
      setUsers(data)
    }

    if (debouncedValue.length) getUsers()
    else setUsers([])
  }, [debouncedValue])

  return (
    <div className={styles.search}>
      <Popover open={!!users.length} onOpenChange={() => setUsers([])}>
        <PopoverTrigger style={{ width: '100%' }}>
          <Input
            placeholder="Name..."
            value={nameDebounce}
            onChange={e => setNameDebounce(e.target.value)}
          />
        </PopoverTrigger>
        <PopoverContent>
          <SubscriptionsUser users={users} handleClose={() => setUsers([])} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

function SubscriptionsUser({
  users,
  handleClose,
}: {
  users: User[]
  handleClose: () => void
}) {
  const { user: currentUser } = useAuth()

  return (
    <div className={styles.users}>
      {users.map(({ _id, avatarUrl, fullName }) => (
        <Link
          href={currentUser!._id === _id ? `/club` : `/club/users/${_id}`}
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
