import React from 'react'
import type { ElementType, HTMLAttributes } from 'react'
import cn from 'classnames'
import { tags, fontVariants } from '../constants'
import styles from './Typography.module.css'

type Props = {
  variant: keyof typeof fontVariants
  tag?: keyof typeof tags
} & HTMLAttributes<HTMLElement>

export function Typography(props: Props) {
  const { children, variant, tag = tags.p, ...restProps } = props
  const CustomTag: ElementType = `${tag}`

  return (
    <CustomTag className={cn(styles[variant])} {...restProps}>
      {children}
    </CustomTag>
  )
}
