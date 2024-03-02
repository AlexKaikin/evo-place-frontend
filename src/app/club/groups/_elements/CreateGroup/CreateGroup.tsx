'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import type { Group } from '@/types/club'
import defaulAvatarUrl from '@assets/img/user/users.jpg'
import { zodResolver } from '@hookform/resolvers/zod'
import { groupService } from '@services'
import { useGroups } from '@store'
import {
  Button,
  Dialog,
  DialogContent,
  Form,
  FormCheckbox,
  FormInput,
  FormTextarea,
  IconButton,
  Spinner,
  Stack,
} from '@ui'
import { selectFile, validateFileSize } from '@utils'
import styles from './CreateGroup.module.css'

const schema = z.object({
  title: z
    .string({ required_error: 'Enter title' })
    .min(1, { message: 'Enter title' }),
  location: z.string().optional(),
  about: z.string().optional(),
  avatarUrl: z.string().optional(),
})

const defaultValues = {
  title: '',
  location: '',
  about: '',
  avatarUrl: '',
}

export function CreateGroup() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { create } = useGroups()
  const formMethods = useForm<Group>({
    defaultValues,
    shouldUnregister: true,
    resolver: zodResolver(schema),
  })

  const { setValue, getValues } = formMethods

  async function handleChangeFile() {
    try {
      const file = (await selectFile('image/*')) as File

      if (!validateFileSize(file, 1)) return toast.info('Image size exceeded!')

      setLoading(true)
      const formData = new FormData()
      formData.append('image', file)
      const { data } = await groupService.uploadImg(formData)

      if (data.url) {
        setLoading(false)
        setValue('avatarUrl', data.url)
      }
    } catch (err) {
      setLoading(false)
      toast.info('Something went wrong. Try again!')
    }
  }

  const handleSubmit = async (data: Group) => {
    const res = await create(data)
    router.push('/club/groups/' + res?.data._id)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent style={{ width: '100%', maxWidth: '700px' }}>
          <Form
            className="groupForm"
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
                      getValues('avatarUrl')?.length
                        ? (getValues('avatarUrl') as string)
                        : defaulAvatarUrl
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
                      onClick={() => setValue('avatarUrl', '')}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.fields}>
                <FormInput name="title" label="Title" />
                <FormTextarea name="about" label="About" />
                <FormInput name="location" label="Location" />
                <FormCheckbox name="private" label="Hidden group" />
                <Stack direction="row" gap={20} justifyContent="space-between">
                  <Button type="submit">Create</Button>
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
