import { ReactNode } from 'react'
import cn from 'classnames'
import styles from './Aside.module.css'

type Props = {
  children: ReactNode
  position?: 'left' | 'right'
  width?: number
  hideInMobile?: boolean
}

export function Aside({ children, position, width, hideInMobile }: Props) {
  return (
    <aside
      className={cn(styles.aside, styles[position || 'left'], {
        [styles.hideInMobile]: hideInMobile,
      })}
      style={{ flex: `0 0 ${width || 200}px` }}
    >
      {children}
    </aside>
  )
}
