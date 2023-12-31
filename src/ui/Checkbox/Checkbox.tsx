import React, { forwardRef, HTMLAttributes, Ref } from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'classnames'
import { FormFieldErrors } from '@ui'
import styles from './Checkbox.module.css'

export type CheckboxProps = HTMLAttributes<HTMLInputElement> & {
  label?: string
  errorState?: FieldError
}

function ForwardRef(props: CheckboxProps, ref: Ref<HTMLInputElement>) {
  const { label, errorState, ...rest } = props

  return (
    <label className={styles.root}>
      <div className={styles.container}>
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          className={cn(styles.checkbox)}
        />
        {label ? <span>{label}</span> : null}
      </div>
      {errorState?.message ? <FormFieldErrors error={errorState} /> : null}
    </label>
  )
}

export const Checkbox = forwardRef(ForwardRef)
