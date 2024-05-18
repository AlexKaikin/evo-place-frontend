'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import imgUrl from '@assets/img/home/friends-posing-party.jpg'
import { useAuth, useLangs } from '@store'
import { Button, Stack, Typography } from '@ui'
import styles from './page.module.css'

export default function Home() {
  const router = useRouter()
  const { error } = useAuth()
  const { lang, translate } = useLangs()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Typography variant="title1" tag="h1">
          {translate[lang].home.title}
        </Typography>
        <Typography variant="text">
          {translate[lang].home.description}
        </Typography>
        {error === 'unauthorized' && (
          <Stack direction="row" gap={20}>
            <Button onClick={() => router.push('/register')}>
              {translate[lang].header.account.register}
            </Button>
            <Button color="secondary" onClick={() => router.push('/login')}>
              {translate[lang].header.account.login}
            </Button>
          </Stack>
        )}
      </div>

      <div className={styles.imgContainer}>
        <Image
          src={imgUrl}
          className={styles.img}
          alt="community"
          sizes="(max-width: 1800px) 50vw"
          fill
        />
      </div>
    </div>
  )
}
