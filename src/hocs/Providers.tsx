'use client'

import { useEffect } from 'react'
import { useAuth } from '@store'

export function Providers({ children }: { children: React.ReactElement }) {
  const { getMe } = useAuth()

  useEffect(() => {
    getMe()
  }, [getMe])

  return <>{children}</>
}
