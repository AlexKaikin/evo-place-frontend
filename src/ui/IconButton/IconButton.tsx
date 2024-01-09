'use client'

import { ComponentProps, Ref, forwardRef } from 'react'
import cn from 'classnames'
import { Icon } from '@ui'
import { solors } from '../constants'
import styles from './IconButton.module.css'

type Props = ComponentProps<'button'> & {
  icon: string
  size?: string
  color?: (typeof solors)[number]
}

function ForwardRef(props: Props, ref: Ref<HTMLButtonElement>) {
  const { icon, color, size, ...rest } = props

  return (
    <button
      {...rest}
      ref={ref}
      className={cn(styles.btn, { [styles[color || 'primary']]: color })}
    >
      <Icon name={icon} size={size} />
    </button>
  )
}

export const IconButton = forwardRef(ForwardRef)
