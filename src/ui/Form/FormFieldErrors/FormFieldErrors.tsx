import { FieldError } from 'react-hook-form'
import { Typography } from '@ui'
import styles from './FormFieldErrors.module.css'

type Props = {
  error: FieldError
}

export function FormFieldErrors({ error }: Props) {
  return (
    <Typography
      role="alert"
      variant="tooltip"
      className={styles.root}
      tag="span"
    >
      {error?.message}
    </Typography>
  )
}
