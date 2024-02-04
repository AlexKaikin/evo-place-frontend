'use client'

import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { User } from '@/types/auth'
import { IconButton, Spinner } from '@/ui'
import defaulAvatarUrl from '@assets/img/user/defaultAvatar.png'
import { authService } from '@services'
import styles from './AvatarForm.module.css'

type Props = {
  user: User
  handleUpdate: (data: User) => void
}

export function AvatarForm({ user, handleUpdate }: Props) {
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl)
  const [loading, setLoading] = useState(false)
  const avatarRef = useRef(null)

  function updateAvatar() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (avatarRef.current) avatarRef.current.click()
  }

  function deleteAvatar() {
    if (user) {
      setAvatarUrl('')
      const profile = { ...user }
      profile.avatarUrl = ''
      handleUpdate(profile)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleChangeFile(e: any) {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      setLoading(true)
      const { data } = await authService.uploadUserAvatar(formData)

      if (data.url && user) {
        setAvatarUrl(data.url)
        const updatedUser = { ...user }
        updatedUser.avatarUrl = data.url
        e.target.value = ''
        setLoading(false)
        handleUpdate(updatedUser)
      }
    } catch (err) {
      setLoading(false)
      toast.info('Something went wrong. Try again!')
    }
  }
  return (
    <div className={styles.avatar}>
      {loading ? (
        <div className={styles.loader}>
          <Spinner width={50} height={50} />
        </div>
      ) : (
        <div className={styles.imgContainer}>
          <Image
            fill
            sizes="(max-width: 1800px) 50vw"
            src={avatarUrl ? avatarUrl : defaulAvatarUrl}
            alt="avatar"
          />

          <input
            ref={avatarRef}
            type="file"
            name="avatarUrl"
            onChange={handleChangeFile}
            hidden
          />
          <div className={styles.avatarChange}>
            <IconButton icon="BsArrowClockwise" onClick={updateAvatar} />
            <IconButton icon="BsTrash3" onClick={deleteAvatar} />
          </div>
        </div>
      )}
    </div>
  )
}
