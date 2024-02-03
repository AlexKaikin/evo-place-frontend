import { Stack, Widget } from '@ui'
import styles from './Events.module.css'

export function Events() {
  return (
    <Widget title="Events">
      <Stack gap={20} className={styles.pop}>
        No events
      </Stack>
    </Widget>
  )
}
