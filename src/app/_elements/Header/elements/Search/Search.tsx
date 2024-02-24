'use client'

import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { Form, FormInput, Icon, Menu, MenuItem } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './Search.module.css'

type Search = { q: string }

const schema = z.object({
  q: z.string({ required_error: 'Введите заголовок' }),
})

export function Search() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const path = useCallback(() => {
    if (pathname.split('/')[1] === 'shop') return 'shop'
    if (pathname.split('/')[1] === 'blog') return 'blog'
    return 'shop'
  }, [pathname])

  const [searchPath, setSearchPath] = useState(path)
  const formMethods = useForm<Search>({
    defaultValues: { q: searchParams.get('q') || '' },
    resolver: zodResolver(schema),
  })

  const handleSubmit = ({ q }: Search) => {
    if (q) router.push(`/${searchPath}?q=${q}`)
    else router.push(`?`)
  }

  useEffect(() => {
    setSearchPath(path())
  }, [path, pathname])

  return (
    <Form id="searchForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <div className={styles.search}>
        <FormInput
          name="q"
          placeholder="Search..."
          startIcon="BsSearch"
          className={styles.input}
        />
        <div className={styles.actions}>
          <div className={styles.selectContainer}>
            <Menu
              label={
                <>
                  in {searchPath} <Icon name="BsCaretDown" size="16" />
                </>
              }
              noHoverBg
            >
              <MenuItem
                label={'in shop'}
                onClick={() => setSearchPath('shop')}
              />
              <MenuItem
                label={'in blog'}
                onClick={() => setSearchPath('blog')}
              />
            </Menu>
          </div>
        </div>
      </div>
    </Form>
  )
}
