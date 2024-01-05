'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import imgUrl from '@assets/img/home/friends-posing-party.jpg'
import { Button, Stack, Typography } from '@ui'
import styles from './page.module.css'

export default function Home() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Typography variant="title-1" tag="h1">
          International community
        </Typography>
        <Typography variant="text">
          Community platform that includes a shop, blog and social network.
        </Typography>
        <Typography variant="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        <Stack direction="row" gap={20}>
          <Button onClick={() => router.push('/register')}>Sign Up</Button>
          <Button color="secondary" onClick={() => router.push('/login')}>
            Log In
          </Button>
        </Stack>
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
