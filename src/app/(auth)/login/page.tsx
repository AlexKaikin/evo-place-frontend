'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth, useLangs } from '@store'
import { Button, FormInput, Typography, Form, Stack } from '@ui'
import styles from './page.module.css'

type Login = {
  email: string
  password: string
}

export default function Login() {
  const { lang, translate } = useLangs()
  const searchParams = useSearchParams()
  const from = searchParams.get('from')
  const { user, login } = useAuth()

  const schema = z.object({
    email: z
      .string({
        required_error: translate[lang].auth.login.emailValidate.required_error,
      })
      .min(1, {
        message: translate[lang].auth.login.emailValidate.message,
      })
      .email(translate[lang].auth.login.emailValidate.correct),
    password: z
      .string({
        required_error:
          translate[lang].auth.login.passwordValidate.required_error,
      })
      .min(8, { message: translate[lang].auth.login.passwordValidate.message })
      .max(32, {
        message: translate[lang].auth.login.passwordValidate.correct,
      }),
  })

  const formMethods = useForm<Login>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schema),
  })

  const handleSubmit = (data: Login) => login(data)

  if (user && from) redirect(`/${from}`)
  if (user && !from) redirect(`/`)
  //if (user) redirect(`/`)

  return (
    <div className={styles.container}>
      <Typography variant="title-3" tag="h1">
        {translate[lang].auth.login.login}
      </Typography>
      <Form id="loginForm" formMethods={formMethods} onSubmit={handleSubmit}>
        <Stack direction="column" gap={30}>
          <FormInput name="email" label={translate[lang].auth.login.email} />
          <FormInput
            type="password"
            name="password"
            label={translate[lang].auth.login.password}
          />
          <p>
            {translate[lang].auth.login.have}{' '}
            <Link href="/register" style={{ color: 'var(--primary)' }}>
              {translate[lang].auth.login.registration}
            </Link>
          </p>
          <Button type="submit" isFullWidth>
            {translate[lang].auth.login.send}
          </Button>
        </Stack>
      </Form>
    </div>
  )
}
