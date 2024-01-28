'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useFavoritePosts } from '@store'
import { Stack, IconButton, Badge } from '@ui'

export function BlogMenu() {
  const router = useRouter()
  const pathname = usePathname()
  const favoritesStore = useFavoritePosts()

  if (pathname.split('/')[1] !== 'blog') return null

  if (!favoritesStore)
    return (
      <Stack direction="row" gap={10}>
        <IconButton icon="BsBookmark" />
      </Stack>
    )

  const { favoritesItems } = favoritesStore

  return (
    <Stack direction="row" gap={10}>
      <Badge
        value={favoritesItems.length}
        onClick={() =>
          favoritesItems.length ? router.push('/blog/favorites') : null
        }
      >
        <IconButton icon="BsBookmark" />
      </Badge>
    </Stack>
  )
}
