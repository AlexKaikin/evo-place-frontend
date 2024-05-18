'use client'

import { useLangs } from '@store'
import { Stack, Typography } from '@ui'
import { ContactForm } from './_elements'
import styles from './page.module.css'

export default function Contacts() {
  const { lang, translate } = useLangs()

  return (
    <div className={styles.container}>
      <Stack
        isWide
        gap={40}
        direction="column"
        justifyContent="center"
        style={{ maxWidth: '600px' }}
      >
        <Typography variant="title3">
          {translate[lang].contacts.sendEmail}
        </Typography>
        <ContactForm />
      </Stack>
    </div>
  )
}
