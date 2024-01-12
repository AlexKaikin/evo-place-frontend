'use client'

import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { Form, FormInput } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './Search.module.css'

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

  const handleSubmit = ({ q }: Search) => {
    if (q) router.push(`/shop?q=${q}`)
    else router.push(`?`)
  }

  return (
    <Form id="searchForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <div className={styles.search}>
        <FormInput name="q" placeholder="Search..." startIcon="BsSearch" />
        <div className={styles.selectContainer}>
          <select name="shop" className={styles.select}>
            <option value="shop">in shop</option>
          </select>
        </div>
      </div>
    </Form>
  )
}
