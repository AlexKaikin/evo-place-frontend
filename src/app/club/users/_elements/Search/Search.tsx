'use client'

import cn from 'classnames'
import { useUsers } from '@store'
import { Button, IconButton, Input } from '@ui'
import styles from './Search.module.css'

export function Search() {
  const { getUsers, filter, setFilter } = useUsers()

  function handleReset() {
    setFilter('')
    getUsers()
  }

  function handleSubmit() {
    if (filter.name.length) getUsers()
  }

  return (
    <div className={styles.search}>
      <Input
        value={filter.name}
        onChange={e => setFilter(e.target.value)}
        placeholder="User name..."
        className={styles.input}
      />
      <div className={styles.actions}>
        <IconButton
          icon="BsXLg"
          className={cn(styles.reset, {
            [styles['active']]: !!filter.name.length,
          })}
          disabled={!filter.name.length}
          onClick={handleReset}
        />
        <Button onClick={handleSubmit}>Search</Button>
      </div>
    </div>
  )
}
