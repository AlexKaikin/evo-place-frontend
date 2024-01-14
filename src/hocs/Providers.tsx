'use client'

import { ReactNode, useEffect } from 'react'
import { useAuth } from '@store'
import { ToastProvider } from './ToastProvider'

export function Providers({ children }: { children: ReactNode }) {
  const { getMe } = useAuth()

  useEffect(() => {
    getMe()
  }, [getMe])

  return <ToastProvider>{children}</ToastProvider>
}
