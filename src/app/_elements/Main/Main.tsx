import { ReactNode } from 'react'
import styles from './Main.module.css'

export function Main({ children }: { children: ReactNode }) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>{children}</div>
    </main>
  )
}
