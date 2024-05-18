'use client'

import { useRouter } from 'next/navigation'
import { Button, Stack, Typography } from '@ui'

export default function NotFound() {
  const router = useRouter()

  return (
    <main style={{ padding: '20px', flexGrow: 1 }}>
      <Stack gap={20}>
        <Typography variant="title1" tag="h1">
          Page not found
        </Typography>
        <Button onClick={() => router.push('/')}>Go to Home page</Button>
      </Stack>
    </main>
  )
}
