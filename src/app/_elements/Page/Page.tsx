import styles from './Page.module.css'

type Props = { title?: string; children: React.ReactNode }

export function Page({ title, children }: Props) {
  return (
    <div className={styles.page}>
      {title && <div>{title}</div>}
      {children}
    </div>
  )
}
