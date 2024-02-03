'use client'

import { ToastContainer, Slide } from 'react-toastify'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer theme="colored" transition={Slide} />
    </>
  )
}
