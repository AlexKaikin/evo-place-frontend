'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { z } from 'zod'
import type { User } from '@/types/auth'
import defaulAvatarUrl from '@assets/img/user/defaultAvatar.png'
import { zodResolver } from '@hookform/resolvers/zod'
import { authService } from '@services'
import {
  Dialog,
  DialogContent,
  IconButton,
  Form,
  FormInput,
  FormCheckbox,
  Button,
  FormTextarea,
  Stack,
  Spinner,
} from '@ui'
import { selectFile, validateFileSize } from '@utils'
import styles from './Settings.module.css'

const schema = z.object({
  id: z.number(),
  location: z.string(),
  about: z.string(),
  interests: z.coerce
    .string()
    .transform(value => value.split(',').map(item => item.trim())),
})

type Props = {
  user: User
  handleUpdate: (data: User) => void
}

export function Settings({ user, handleUpdate }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const formMethods = useForm<User & { interests: string }>({
    defaultValues: { ...user, interests: user.interests.join(', ') },
    shouldUnregister: true,
    resolver: zodResolver(schema),
  })

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

  const handleSubmit = (data: User) => handleUpdate(data)

  return (
    <>
      <IconButton icon="BsGear" onClick={() => setOpen(true)} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent style={{ width: '100%', maxWidth: '700px' }}>
          <Form
            className="userForm"
            formMethods={formMethods}
            onSubmit={handleSubmit}
          >
            <div className={styles.form}>
              <div className={styles.avatar}>
                <div className={styles.imgContainer}>
                  <Image
                    fill
                    sizes="(max-width: 1800px) 50vw"
                    src={
                      user.avatarUrl.length ? user.avatarUrl : defaulAvatarUrl
                    }
                    alt="avatar"
                  />
                  {loading && (
                    <div className={styles.loader}>
                      <Spinner width={50} height={50} color="var(--primary)" />
                    </div>
                  )}
                  <div className={styles.avatarChange}>
                    <IconButton
                      type="button"
                      icon="BsArrowClockwise"
                      onClick={handleChangeFile}
                    />
                    <IconButton
                      type="button"
                      icon="BsTrash3"
                      onClick={() => handleUpdate({ ...user, avatarUrl: '' })}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.fields}>
                <FormInput name="fullName" label="Nickname" readOnly />
                <FormTextarea name="about" label="About" />
                <FormInput
                  name="interests"
                  label="Interests (separated by commas)"
                />
                <FormInput name="location" label="Location" />
                <FormCheckbox name="private" label="Hidden profile" />
                <Stack direction="row" gap={20} justifyContent="space-between">
                  <Button type="submit">Update</Button>
                  <Button
                    color="secondary"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </div>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
