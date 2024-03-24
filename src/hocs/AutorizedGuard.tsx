'use client'

import { ReactNode } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { useAuth } from '@store'
import { Spinner, Stack } from '@ui'

export function AutorizedGuard({ children }: { children: ReactNode }) {
  const { user, error } = useAuth()
  const pathname = usePathname().split('/')[1]

  if (error === 'unauthorized') redirect(`/login?from=${pathname}`)

  if (!user)
    return (
      <Stack alignItems="center" justifyContent="center" isWide>
        <Spinner color="var(--primary)" width={100} height={100} />
      </Stack>
    )

  return children
}
