'use client'

import { useEffect, useState } from 'react'
import { IconButton } from '@ui'

export function Theme() {
  let currentTheme = 'light'

  if (typeof window !== 'undefined') {
    currentTheme =
      localStorage?.getItem('theme')?.replace(/["]/g, '') || 'light'
  }

  const [theme, setTheme] = useState(currentTheme)

  function themeChange() {
    if (theme === 'dark') {
      setTheme('light')
      localStorage?.setItem('theme', JSON.stringify('light'))
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      setTheme('dark')
      localStorage?.setItem('theme', JSON.stringify('dark'))
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <IconButton
      icon={theme === 'light' ? 'BsMoonFill' : 'BsSun'}
      onClick={themeChange}
    />
  )
}
