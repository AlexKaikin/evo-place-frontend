'use client'

import { useAuth } from '@store'
import { Aside } from '../_elements'
import { AvatarForm, Events, UserForm } from './_elements'
import styles from './page.module.css'

export default function Profile() {
  const { user, update } = useAuth()

  if (!user) return null

  return (
    <>
      <div className={styles.page}>
        <div className={styles.content}>
          <AvatarForm user={user} handleUpdate={update} />
          <UserForm user={user} handleUpdate={update} />
        </div>
      </div>
      <Aside position="right" width={400}>
        <Events />
      </Aside>
    </>
  )
}
