'use client'

import { useEffect, useState } from 'react'
import { useDebounce } from '@hooks'
import { useChats } from '@store'
import { Input } from '@ui'
import styles from './Search.module.css'

export function Search() {
  const { setChats } = useChats()
  const [nameDebounce, setNameDebounce] = useState('')
  const debouncedValue = useDebounce(nameDebounce, 2000)

  useEffect(() => {
    if (debouncedValue.length) setChats(debouncedValue)
    else setChats('')
  }, [debouncedValue, setChats])

  return (
    <div className={styles.search}>
      <Input
        placeholder="Search..."
        value={nameDebounce}
        onChange={e => setNameDebounce(e.target.value)}
      />
    </div>
  )
}
