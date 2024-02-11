'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { User } from '@/types/auth'
import { Button, Form, FormInput, FormTextarea, Stack } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './UserForm.module.css'

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

export function UserForm({ user, handleUpdate }: Props) {
  const formMethods = useForm<User & { interests: string }>({
    defaultValues: { ...user, interests: user.interests.join(', ') },
    resolver: zodResolver(schema),
  })
  const {
    reset,
    formState: { isDirty, isSubmitSuccessful },
  } = formMethods

  const handleSubmit = (data: User) => handleUpdate(data)

  useEffect(() => {
    if (isSubmitSuccessful)
      reset({ ...user, interests: user.interests.join(', ') })
  }, [isSubmitSuccessful, reset, user])

  return (
    <div className={styles.info}>
      <Form id="userForm" formMethods={formMethods} onSubmit={handleSubmit}>
        <Stack gap={40}>
          <FormInput name="email" label="Email" readOnly />
          <FormInput name="fullName" label="Login" readOnly />
          <FormInput name="location" label="Location" />
          <FormTextarea name="about" label="About" rows={4}></FormTextarea>
          <FormTextarea name="interests" label="Interests"></FormTextarea>
          {isDirty && <Button type="submit">Update</Button>}
        </Stack>
      </Form>
    </div>
  )
}
