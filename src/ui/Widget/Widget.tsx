import { ComponentProps, HTMLAttributes, ReactNode } from 'react'
import { Icon } from '@ui'
import styles from './Widget.module.css'

type Props = ComponentProps<'div'> & {
  children: ReactNode
  title?: string
  icon?: string
} & HTMLAttributes<HTMLElement>

export function Widget({ children, title, icon, ...rest }: Props) {
  return (
    <div {...rest}>
      <div className={styles.widget}>
        {title && (
          <h3 className={styles.title}>
            {icon && <Icon name={icon} />}
            {title}
          </h3>
        )}
        <div>{children}</div>
      </div>
    </div>
  )
}

export function WidgetGroup({ children, title, icon, ...rest }: Props) {
  return (
    <div {...rest}>
      <div className={styles.widgetGroup}>
        {title && (
          <h3 className={styles.title}>
            {icon && <Icon name={icon} />}
            {title}
          </h3>
        )}
        <div className={styles.widgetGroupItem}>{children}</div>
      </div>
    </div>
  )
}
