'use client'

import { forwardRef, Ref, ComponentProps } from 'react'
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

  return (
    <div>
      <div className={styles.field}>
        {label && <label className={styles.label}>{label}</label>}
        {startIcon && <Icon name={startIcon} />}
        <input
          className={cn(styles.input, { [styles[align]]: align })}
          ref={ref}
          {...rest}
        />
        {endIcon && <Icon name={endIcon} />}
      </div>
      {errorState?.message ? <FormFieldErrors error={errorState} /> : null}
    </div>
  )
}

export const Input = forwardRef(ForwardRef)
