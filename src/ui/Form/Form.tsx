'use client'

import { FormHTMLAttributes, PropsWithChildren } from 'react'
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'
import cn from 'classnames'
import styles from './Form.module.css'

type Props<Values extends FieldValues = FieldValues> = {
  formMethods: UseFormReturn<Values>
  onSubmit: SubmitHandler<Values>
  onSubmitError?: SubmitErrorHandler<Values>
  variant?: 'column' | 'row'
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>

export function Form<Values extends FieldValues = FieldValues>(
  props: PropsWithChildren<Props<Values>>
) {
  const {
    variant = 'column',
    children,
    formMethods,
    onSubmit,
    onSubmitError,
    ...rest
  } = props
  return (
    <FormProvider {...formMethods}>
      <form
        noValidate
        {...rest}
        onSubmit={formMethods.handleSubmit(onSubmit, onSubmitError)}
        className={cn(styles.form, styles[variant])}
      >
        {children}
      </form>
    </FormProvider>
  )
}
