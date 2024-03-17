import { Stack, Typography } from '@ui'
import { ContactForm } from './_elements'
import styles from './page.module.css'

export default function Contacts() {
  return (
    <div className={styles.container}>
      <Stack
        isWide
        gap={40}
        direction="column"
        justifyContent="center"
        style={{ maxWidth: '600px' }}
      >
        <Typography variant="title-3">Send an email</Typography>
        <ContactForm />
      </Stack>
    </div>
  )
}
