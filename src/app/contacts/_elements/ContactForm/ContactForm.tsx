'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLangs } from '@store'
import { Button, Form, FormInput, FormTextarea, Stack } from '@ui'

type Mail = {
  title: string
  body: string
}

export function ContactForm() {
  const { lang, translate } = useLangs()

  const schema = z.object({
    title: z
      .string({ required_error: translate[lang].contacts.titleValidate })
      .min(1, { message: translate[lang].contacts.titleValidate }),
    body: z
      .string({ required_error: translate[lang].contacts.bodyValidate })
      .min(1, { message: translate[lang].contacts.bodyValidate }),
  })

  const formMethods = useForm<Mail>({
    defaultValues: { title: '', body: '' },
    resolver: zodResolver(schema),
  })
  const { reset } = formMethods

  const handleSubmit = async () => {
    try {
      reset()
    } catch (error) {
      toast.info(translate[lang].contacts.wrong)
    }
  }

  return (
    <Form id="reviewForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <Stack direction="column" gap={30}>
        <FormInput name="title" label={translate[lang].contacts.title} />
        <FormTextarea
          name="body"
          rows={7}
          label={translate[lang].contacts.body}
        />
        <Stack direction="row" justifyContent="space-between" gap={20}>
          <Button type="submit">{translate[lang].contacts.send}</Button>
        </Stack>
      </Stack>
    </Form>
  )
}
