'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@store'
import { Button, FormInput, Typography, Form, Stack } from '@ui'
import styles from './page.module.css'

type Login = {
  email: string
  password: string
}

const schema = z.object({
  email: z
    .string({ required_error: 'Enter your email' })
    .min(1, { message: 'Enter your email' })
    .email('Enter the correct email'),
  password: z
    .string({ required_error: 'Enter password' })
    .min(8, { message: 'Enter the correct password' })
    .max(32, { message: 'Enter the correct password' }),
})

export default function Login() {
  const { user, login } = useAuth()
  const formMethods = useForm<Login>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schema),
  })

  const handleSubmit = (data: Login) => login(data)

  if (user) redirect('/')

  return (
    <div className={styles.container}>
      <Typography variant="title-3" tag="h1">
        Log In
      </Typography>
      <Form id="loginForm" formMethods={formMethods} onSubmit={handleSubmit}>
        <Stack direction="column" gap={30}>
          <FormInput name="email" label="Email" />
          <FormInput type="password" name="password" label="Password" />
          <p>
            You don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: 'var(--primary)' }}>
              Registration
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
