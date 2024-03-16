'use client'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { NewMessage } from '@/types/club'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMessages } from '@store'
import { Form, FormTextarea, IconButton } from '@ui'
import styles from './NewMessageForm.module.css'

const schema = z.object({ text: z.string() })

export function NewMessageForm() {
  const { roomId, create } = useMessages()
  const ref = useRef<HTMLTextAreaElement | null>(null)

  const formMethods = useForm<NewMessage>({
    defaultValues: { text: '' },
    resolver: zodResolver(schema),
  })

  const { reset, watch } = formMethods

  const height = watch('text').length
    ? ref.current?.scrollHeight + 'px'
    : 'auto'

  const handleSubmit = async (data: NewMessage) => {
    create(data)
    reset()
  }

  if (!roomId) return null

  return (
    <Form id="noteForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <FormTextarea
          name="text"
          placeholder="New message..."
          style={{ paddingRight: '60px', height, backgroundColor: 'var(--bg)' }}
          ref={ref}
        />
        {watch('text').length ? (
          <div className={styles.control}>
            <IconButton color="primary" icon="BsArrowUpShort" type="submit" />
          </div>
        ) : null}
      </div>
    </Form>
  )
}
