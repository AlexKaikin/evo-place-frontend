import cn from 'classnames'
import { ReactNode } from 'react'
import styles from './Button.module.css'
import { variants, sizes, solors } from '../constants'

type Props = {
  size?: (typeof sizes)[number]
  color?: (typeof solors)[number]
  variant?: (typeof variants)[number]
  disabled?: boolean
  readOnly?: boolean
  endIcon?: ReactNode
  children?: ReactNode
  onClick?: () => void
  startIcon?: ReactNode
  type?: 'button' | 'submit'
  className?: string
  isFullWidth?: boolean
  isActive?: boolean
}

export function Button(props: Props) {
  const {
    endIcon,
    children,
    readOnly,
    startIcon,
    size = 'medium',
    color = 'primary',
    variant = 'contained',
    isFullWidth,
    isActive,
    ...restProps
  } = props
  return (
    <button
      type="button"
      className={cn(styles.btn, styles[color], styles[size], styles[variant], {
        [styles.readOnly]: readOnly,
        [styles.fullWidth]: isFullWidth,
        [styles.active]: isActive,
      })}
      {...restProps}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  )
}
