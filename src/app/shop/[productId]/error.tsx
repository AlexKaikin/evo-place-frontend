'use client'

import { useRouter } from 'next/navigation'
import { Button, Stack, Typography } from '@ui'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  return (
    <main style={{ padding: '20px', flexGrow: 1 }}>
      <Stack gap={20}>
        <Typography variant="title-1" tag="h1">
          Something went wrong!
        </Typography>
        <Stack direction="row" gap={20}>
          <Button onClick={() => reset()}>Try again</Button>{' '}
          <Button onClick={() => router.push('/')}>Go to Home oage</Button>
        </Stack>
      </Stack>
    </main>
  )
}
