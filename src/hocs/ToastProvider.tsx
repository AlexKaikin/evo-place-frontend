'use client'

import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer theme="colored" transition={Slide} />
    </>
  )
}
