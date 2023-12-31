'use client'

import { useEffect, useState } from 'react'
import { getCookie, setCookie } from '@/utils'
import { IconButton } from '@ui'

export function Theme() {
  const [theme, setTheme] = useState<string | null>(null)
  const icon = theme === 'light' ? 'BsMoonFill' : 'BsSun'

  function themeChange() {
    if (theme === 'dark') {
      setTheme('light')
      localStorage?.setItem('theme', JSON.stringify('light'))
      setCookie('theme', 'light', { expires: 60 * 60 * 24 * 30 })
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      setTheme('dark')
      localStorage?.setItem('theme', JSON.stringify('dark'))
      setCookie('theme', 'dark', { expires: 60 * 60 * 24 * 30 })
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }

  useEffect(() => {
    const currentTheme = getCookie('theme') || 'light'
    setTheme(currentTheme)
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [])

  if (!theme)
    return <IconButton icon="BsSun" style={{ color: 'transparent' }} />

  return <IconButton icon={icon} onClick={themeChange} />
}
