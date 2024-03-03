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
  title: z
    .string({ required_error: 'Enter title' })
    .min(1, { message: 'Enter title' }),
  location: z.string(),
  about: z.string(),
})

type Props = {
  group: Group
  handleUpdate: (data: Group) => Promise<Group | undefined>
  handleDelete: (id: string) => Promise<Group | undefined>
}

export function Settings({ group, handleUpdate, handleDelete }: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const formMethods = useForm<Group>({
    defaultValues: group,
    resolver: zodResolver(schema),
  })

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
        handleUpdate({ ...group, avatarUrl: data.url })
      }
    } catch (err) {
      setLoading(false)
      toast.info('Something went wrong. Try again!')
    }
  }

  function handleDeleteImg() {
    handleUpdate({ ...group, avatarUrl: '' })
  }

  async function handleDeleteGroup() {
    const res = await handleDelete(String(group.id))
    if (res) router.push('/club/groups/')
  }

  const handleSubmit = async (data: Group) => {
    const res = await handleUpdate({ ...data, id: group.id })
    if (res) setOpen(false)
  }

  return (
    <>
      <Button size="small" variant="text" onClick={() => setOpen(true)}>
        Edit
      </Button>
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
                      group.avatarUrl?.length
                        ? group.avatarUrl
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
                      onClick={handleDeleteImg}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.fields}>
                <FormInput name="title" label="Title" />
                <FormTextarea name="about" label="About" />
                <FormInput name="location" label="Location" />
                <FormCheckbox name="private" label="Hidden group" />
                <Stack direction="row" gap={20}>
                  <Button type="submit">Update</Button>
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={handleDeleteGroup}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="text"
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
