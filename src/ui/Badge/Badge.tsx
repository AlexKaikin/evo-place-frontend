import { ReactNode } from 'react'
import styles from './Badge.module.css'

type Props = {
  children: ReactNode
  value: number
  showZero?: boolean
  variant?: 'dot' | 'number'
  max?: number
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'right'
}

export function Badge(props: Props) {
  const { children, value } = props

  return (
    <div className={styles.badge}>
      {!!value && <span className={styles.value}>{value}</span>}
      {children}
    </div>
  )
}
