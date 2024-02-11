'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { User } from '@/types/auth'
import defaulAvatarUrl from '@assets/img/user/defaultAvatar.png'
import { authService } from '@services'
import { IconButton, Spinner } from '@ui'
import { selectFile, validateFileSize } from '@utils'
import styles from './AvatarForm.module.css'

type Props = {
  user: User
  handleUpdate: (data: User) => void
}

export function AvatarForm({ user, handleUpdate }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleChangeFile() {
    try {
      const file = (await selectFile('image/*')) as File

      if (!validateFileSize(file, 1)) return toast.info('Image size exceeded!')

      setLoading(true)
      const formData = new FormData()
      formData.append('image', file)
      const { data } = await authService.uploadUserAvatar(formData)

      if (data.url) {
        setLoading(false)
        handleUpdate({ ...user, avatarUrl: data.url })
      }
    } catch (err) {
      setLoading(false)
      toast.info('Something went wrong. Try again!')
    }
  }

  if (loading)
    return (
      <div className={styles.loader}>
        <Spinner width={50} height={50} />
      </div>
    )

  return (
    <div className={styles.avatar}>
      <div className={styles.imgContainer}>
        <Image
          fill
          sizes="(max-width: 1800px) 50vw"
          src={user.avatarUrl.length ? user.avatarUrl : defaulAvatarUrl}
          alt="avatar"
        />
        <div className={styles.avatarChange}>
          <IconButton icon="BsArrowClockwise" onClick={handleChangeFile} />
          <IconButton
            icon="BsTrash3"
            onClick={() => handleUpdate({ ...user, avatarUrl: '' })}
          />
        </div>
      </div>
    </div>
  )
}
