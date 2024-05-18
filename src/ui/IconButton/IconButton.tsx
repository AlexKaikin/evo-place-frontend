'use client'

import { ComponentProps, Ref, forwardRef } from 'react'
import cn from 'classnames'
import { Icon } from '@ui'
import { colors } from '../constants'
import styles from './IconButton.module.css'

type Props = ComponentProps<'button'> & {
  icon: string
  size?: string
  color?: keyof typeof colors
}

function ForwardRef(props: Props, ref: Ref<HTMLButtonElement>) {
  const { icon, color, size, ...rest } = props

  return (
    <button
      ref={ref}
      className={cn(styles.btn, { [styles[color || colors.primary]]: color })}
      {...rest}
    >
      <Icon name={icon} size={size} />
    </button>
  )
}

export const IconButton = forwardRef(ForwardRef)
