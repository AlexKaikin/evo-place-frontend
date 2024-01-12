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
          Welcome to the EVO community space. Here we are interested in the care
          of health, beauty and longevity. All users have access to such
          services as e-shop, blog, social network. Every day we are getting
          bigger. We&apos;ll be glad to see you in the community, and help you
          reach your goals.
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
