import { ComponentProps, ReactNode } from 'react'
import styles from './Badge.module.css'

type Props = ComponentProps<'div'> & {
  children: ReactNode
  value: number
  showZero?: boolean
  variant?: 'dot' | 'number'
  max?: number
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'right'
}

export function Badge(props: Props) {
  const { children, value, ...restProps } = props

  return (
    <div className={styles.badge} {...restProps}>
      {!!value && <span className={styles.value}>{value}</span>}
      {children}
    </div>
  )
}
