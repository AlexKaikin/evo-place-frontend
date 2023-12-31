'use client'

import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { Form, FormInput } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'

type Search = { q: string }

const schema = z.object({
  q: z.string({ required_error: 'Введите заголовок' }),
})

export function Search() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const formMethods = useForm<Search>({
    defaultValues: { q: searchParams.get('q') || '' },
    resolver: zodResolver(schema),
  })

  const handleSubmit = async ({ q }: Search) => {
    if (q) router.push(`?q=${q}`)
    else router.push(`?`)
  }

  return (
    <Form id="searchForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <FormInput name="q" placeholder="Search..." startIcon="BsSearch" />
    </Form>
  )
}
