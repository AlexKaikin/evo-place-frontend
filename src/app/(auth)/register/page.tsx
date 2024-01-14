'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@store'
import { Button, FormInput, Typography, Form, Stack } from '@ui'
import styles from './page.module.css'

type Register = {
  fullName: string
  email: string
  password: string
}

const schema = z.object({
  fullName: z
    .string({ required_error: 'Enter your login' })
    .min(2, { message: 'Minimum length 2 characters' })
    .max(32, { message: 'Maximum length 32 characters' }),
  email: z
    .string({ required_error: 'Enter your email' })
    .min(1, { message: 'Enter your email' })
    .email('Enter the correct email'),
  password: z
    .string({ required_error: 'Enter password' })
    .min(8, { message: 'Minimum length 8 characters' })
    .max(32, { message: 'Maximum length 32 characters' }),
})

export default function Register() {
  const { user, register } = useAuth()
  const formMethods = useForm<Register>({
    defaultValues: { fullName: '', email: '', password: '' },
    resolver: zodResolver(schema),
  })

  const handleSubmit = (data: Register) => register(data)

  if (user) redirect('/')

  return (
    <div className={styles.container}>
      <Typography variant="title-3" tag="h1">
        Registration
      </Typography>
      <Form id="registerForm" formMethods={formMethods} onSubmit={handleSubmit}>
        <Stack direction="column" gap={30}>
          <FormInput name="fullName" label="Login" />
          <FormInput name="email" label="Email" />
          <FormInput type="password" name="password" label="Password" />
          <p>
            Do you have an account?{' '}
            <Link href="/login" style={{ color: 'var(--primary)' }}>
              Log In
            </Link>
          </p>
          <Button type="submit" isFullWidth>
            Send
          </Button>
        </Stack>
      </Form>
    </div>
  )
}
