'use client'

import { useEffect, useState } from 'react'
import { IconButton } from '@ui'
import { getCookie, setCookie } from '@utils'

export function Theme() {
  const [theme, setTheme] = useState<string | null>(null)
  const icon = theme === 'light' ? 'BsMoonFill' : 'BsSun'

  function themeChange() {
    if (theme === 'dark') {
      setTheme('light')
      localStorage?.setItem('theme', JSON.stringify('light'))
      setCookie('theme', 'light', { expires: 60 * 60 * 24 * 30, path: '/' })
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      setTheme('dark')
      localStorage?.setItem('theme', JSON.stringify('dark'))
      setCookie('theme', 'dark', { expires: 60 * 60 * 24 * 30, path: '/' })
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }

  useEffect(() => {
    setTheme(getCookie('theme') || 'light')
  }, [])

  if (!theme)
    return <IconButton icon="BsMoonFill" style={{ color: 'transparent' }} />

  return <IconButton icon={icon} onClick={themeChange} />
}
