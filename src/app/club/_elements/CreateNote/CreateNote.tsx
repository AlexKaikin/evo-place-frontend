'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import type { CreateNote } from '@/types/club'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth, useNotes } from '@store'
import { Form, FormTextarea, IconButton } from '@ui'
import styles from './CreateNote.module.css'

const schema = z.object({
  text: z
    .string({ required_error: 'Enter your note' })
    .min(1, { message: 'Enter your note' }),
})

export function CreateNote() {
  const { user } = useAuth()
  const { createNotesUser } = useNotes()

  const formMethods = useForm<CreateNote>({
    defaultValues: { text: '' },
    resolver: zodResolver(schema),
  })

  const { reset } = formMethods

  const handleSubmit = async (data: CreateNote) => {
    try {
      data.user = user!._id
      data.group = null
      createNotesUser(data)
      reset()
    } catch (error) {
      toast.info('Something went wrong!')
    }
  }

  return (
    <Form id="noteForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <FormTextarea name="text" color="red" placeholder="New note" />
        <div className={styles.control}>
          <IconButton icon="BsSend" type="submit" />
        </div>
      </div>
    </Form>
  )
}
