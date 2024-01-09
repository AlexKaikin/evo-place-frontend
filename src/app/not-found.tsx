import Link from 'next/link'
import { Stack, Typography } from '@/ui'

export default function NotFound() {
  return (
    <main style={{ padding: '20px', flexGrow: 1 }}>
      <Stack gap={20}>
        <Typography variant="title-1" tag="h1">
          Page not found
        </Typography>
        <Link href="/">Go to Home oage</Link>
      </Stack>
    </main>
  )
}
