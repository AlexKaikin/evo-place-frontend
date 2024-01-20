'use client'

import { forwardRef, Ref, ComponentProps } from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'classnames'
import { FormFieldErrors } from '@ui'
import styles from './Textarea.module.css'

type Props = ComponentProps<'textarea'> & {
  label?: string
  errorState?: FieldError
}

function ForwardRef(props: Props, ref: Ref<HTMLTextAreaElement>) {
  const { errorState, label, ...rest } = props

  return (
    <div>
      <div className={styles.field}>
        {label && <label className={styles.label}>{label}</label>}
        <textarea className={cn(styles.textarea)} ref={ref} {...rest} />
      </div>
      {errorState?.message ? <FormFieldErrors error={errorState} /> : null}
    </div>
  )
}

export const Textarea = forwardRef(ForwardRef)
