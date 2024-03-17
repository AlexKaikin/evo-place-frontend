'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, FormInput, FormTextarea, Stack } from '@ui'

type Mail = {
  title: string
  body: string
}

const schema = z.object({
  title: z
    .string({ required_error: 'Enter title' })
    .min(1, { message: 'Enter title' }),
  body: z
    .string({ required_error: 'Enter text' })
    .min(1, { message: 'Enter text' }),
})

export function ContactForm() {
  const formMethods = useForm<Mail>({
    defaultValues: { title: '', body: '' },
    resolver: zodResolver(schema),
  })
  const { reset } = formMethods

  const handleSubmit = async (data: Mail) => {
    try {
      // eslint-disable-next-line no-console
      console.log(data)
      reset()
    } catch (error) {
      toast.info('Something went wrong!')
    }
  }

  return (
    <Form id="reviewForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <Stack direction="column" gap={30}>
        <FormInput name="title" label="Title" />
        <FormTextarea name="body" rows={7} label="Text" />
        <Stack direction="row" justifyContent="space-between" gap={20}>
          <Button type="submit">Send</Button>
        </Stack>
      </Stack>
    </Form>
  )
}
