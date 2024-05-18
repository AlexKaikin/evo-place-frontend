'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth, useLangs } from '@store'
import { Button, FormInput, Typography, Form, Stack } from '@ui'
import styles from './page.module.css'

type Register = {
  fullName: string
  email: string
  password: string
}

export default function Register() {
  const { user, register } = useAuth()
  const { lang, translate } = useLangs()

  const schema = z.object({
    fullName: z
      .string({
        required_error:
          translate[lang].auth.register.loginValidate.required_error,
      })
      .min(2, {
        message: translate[lang].auth.register.loginValidate.messageMin,
      })
      .max(32, {
        message: translate[lang].auth.register.loginValidate.messageMax,
      }),
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
          translate[lang].auth.register.passwordValidate.required_error,
      })
      .min(8, {
        message: translate[lang].auth.register.passwordValidate.messageMin,
      })
      .max(32, {
        message: translate[lang].auth.register.passwordValidate.messageMax,
      }),
  })

  const formMethods = useForm<Register>({
    defaultValues: { fullName: '', email: '', password: '' },
    resolver: zodResolver(schema),
  })

  const handleSubmit = (data: Register) => register(data)

  if (user) redirect('/')

  return (
    <div className={styles.container}>
      <Typography variant="title3" tag="h1">
        {translate[lang].auth.login.registration}
      </Typography>
      <Form id="registerForm" formMethods={formMethods} onSubmit={handleSubmit}>
        <Stack direction="column" gap={30}>
          <FormInput
            name="fullName"
            label={translate[lang].auth.register.login}
          />
          <FormInput name="email" label={translate[lang].auth.login.email} />
          <FormInput
            type="password"
            name="password"
            label={translate[lang].auth.login.password}
          />
          <p>
            {translate[lang].auth.register.have}{' '}
            <Link href="/login" style={{ color: 'var(--primary)' }}>
              {translate[lang].auth.login.login}
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
