import { ComponentProps, ReactNode } from 'react'
import cn from 'classnames'
import { sizes, solors, variants } from '../constants'
import styles from './Button.module.css'

type Props = ComponentProps<'button'> & {
  size?: (typeof sizes)[number]
  color?: (typeof solors)[number]
  variant?: (typeof variants)[number]
  endIcon?: ReactNode
  children?: ReactNode
  startIcon?: ReactNode
  isFullWidth?: boolean
}

export function Button(props: Props) {
  const {
    size,
    color,
    variant,
    endIcon,
    children,
    startIcon,
    isFullWidth,
    ...restProps
  } = props

  return (
    <button
      className={cn(styles.btn, {
        [styles.fullWidth]: isFullWidth,
        [styles[size || 'medium']]: size,
        [styles[color || 'primary']]: color,
        [styles[variant || 'contained']]: variant,
      })}
      {...restProps}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  )
}
