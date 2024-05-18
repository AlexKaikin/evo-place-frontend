import { ComponentProps, ReactNode } from 'react'
import cn from 'classnames'
import { sizes, colors, variants } from '../constants'
import styles from './Button.module.css'

type Props = ComponentProps<'button'> & {
  size?: keyof typeof sizes
  color?: keyof typeof colors
  variant?: keyof typeof variants
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
        [styles[size || sizes.medium]]: size,
        [styles[color || colors.primary]]: color,
        [styles[variant || variants.contained]]: variant,
      })}
      {...restProps}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  )
}
