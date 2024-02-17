'use client'

import { forwardRef, Ref, ComponentProps, useState } from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'classnames'
import { Icon, FormFieldErrors } from '@ui'
import styles from './Input.module.css'

type Props = ComponentProps<'input'> & {
  label?: string
  startIcon?: string
  endIcon?: string
  errorState?: FieldError
  align?: 'left' | 'center' | 'right'
}

function ForwardRef(props: Props, ref: Ref<HTMLInputElement>) {
  const {
    errorState,
    label,
    startIcon,
    align = 'left',
    endIcon,
    ...rest
  } = props
  const [focus, setFocus] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div
        className={cn({
          [styles.field]: rest.type !== 'hidden',
          [styles.focus]: focus,
        })}
      >
        {label && <label className={cn(styles.label)}>{label}</label>}
        {startIcon && <Icon name={startIcon} />}
        <input
          onFocus={() => setFocus(true)}
          className={cn(styles.input, { [styles[align]]: align })}
          ref={ref}
          {...rest}
          onBlur={() => setFocus(false)}
        />
        {endIcon && <Icon name={endIcon} />}
      </div>
      {errorState?.message ? <FormFieldErrors error={errorState} /> : null}
    </div>
  )
}

export const Input = forwardRef(ForwardRef)
