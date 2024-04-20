import { useLangs } from '@store'
import { Stack, Widget } from '@ui'
import styles from './Events.module.css'

export function Events() {
  const { lang, translate } = useLangs()

  return (
    <Widget title={translate[lang].account.events.events}>
      <Stack gap={20} className={styles.pop}>
        {translate[lang].account.events.noEvents}
      </Stack>
    </Widget>
  )
}
