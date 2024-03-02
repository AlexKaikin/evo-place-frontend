'use client'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import type { CreateNote, Group } from '@/types/club'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth, useNotes } from '@store'
import { Form, FormTextarea, IconButton } from '@ui'
import styles from './CreateNote.module.css'

const schema = z.object({
  text: z
    .string({ required_error: 'Enter your note' })
    .min(1, { message: 'Enter your note' }),
})

type Props = {
  by?: Group
}

export function CreateNote({ by }: Props) {
  const { user } = useAuth()
  const { createNote } = useNotes()
  const ref = useRef<HTMLTextAreaElement | null>(null)

  const formMethods = useForm<CreateNote>({
    defaultValues: { text: '' },
    resolver: zodResolver(schema),
  })

  if (by && by.creator !== user?._id) return null

  const { reset, watch } = formMethods

  const height = watch('text').length
    ? ref.current?.scrollHeight + 'px'
    : 'auto'

  const handleSubmit = async (data: CreateNote) => {
    try {
      data.user = by ? null : user!._id
      data.group = by ? by._id : null
      createNote(data)
      reset()
    } catch (error) {
      toast.info('Something went wrong!')
    }
  }

  return (
    <Form id="noteForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <FormTextarea
          name="text"
          placeholder="New note..."
          style={{ paddingRight: '60px', height }}
          ref={ref}
        />
        {watch('text').length ? (
          <div className={styles.control}>
            <IconButton color="primary" icon="BsArrowDownShort" type="submit" />
          </div>
        ) : null}
      </div>
    </Form>
  )
}
