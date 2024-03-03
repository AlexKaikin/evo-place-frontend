'use client'

import cn from 'classnames'
import { useGroups } from '@store'
import { Button, IconButton, Input } from '@ui'
import styles from './Search.module.css'

export function Search() {
  const { getGroups, filter, setFilter } = useGroups()

  function handleReset() {
    setFilter('')
    getGroups()
  }

  function handleSubmit() {
    if (filter.title.length) getGroups()
  }

  return (
    <div className={styles.search}>
      <Input
        value={filter.title}
        onChange={e => setFilter(e.target.value)}
        placeholder="Group title..."
        className={styles.input}
      />
      <div className={styles.actions}>
        <IconButton
          icon="BsXLg"
          className={cn(styles.reset, {
            [styles['active']]: !!filter.title.length,
          })}
          disabled={!filter.title.length}
          onClick={handleReset}
        />
        <Button onClick={handleSubmit}>Search</Button>
      </div>
    </div>
  )
}
