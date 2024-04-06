'use client'

import { Aside } from '../_elements'
import { CreateNote, Notes, Profile, Recommendations } from './_elements'
import styles from './page.module.css'

export default function Page() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.content}>
          <Profile />
          <CreateNote />
          <Notes />
        </div>
      </div>
      <Aside position="right" width={300}>
        <Recommendations />
      </Aside>
    </>
  )
}
