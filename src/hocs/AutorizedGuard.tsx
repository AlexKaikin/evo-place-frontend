'use client'

import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { Spinner, Stack } from '@/ui'
import { useAuth } from '@store'

export function AutorizedGuard({ children }: { children: ReactNode }) {
  const { user, error } = useAuth()

  if (error === 'unauthorized') redirect('/login')

  if (!user)
    return (
      <Stack alignItems="center" justifyContent="center" isWide>
        <Spinner width={100} height={100} />
      </Stack>
    )

  return <>{children}</>
}
