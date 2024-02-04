'use client'

import { ReactNode } from 'react'
import { InitializationProvider } from './InitializationProvider'
import { ToastProvider } from './ToastProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <InitializationProvider>
      <ToastProvider>{children}</ToastProvider>
    </InitializationProvider>
  )
}
