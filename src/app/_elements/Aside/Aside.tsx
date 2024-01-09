import { ReactNode } from 'react'
import cn from 'classnames'
import styles from './Aside.module.css'

type Props = {
  children: ReactNode
  position?: 'left' | 'right'
  width?: number
}

export function Aside({ children, position, width }: Props) {
  return (
    <aside
      className={cn(styles.aside, styles[position || 'left'])}
      style={{ flex: `0 0 ${width || 200}px` }}
    >
      {children}
    </aside>
  )
}
