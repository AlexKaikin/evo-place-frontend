'use client'

import { Post } from '@/types/blog'
import { useFavoritePosts } from '@store'
import { IconButton } from '@ui'

export function Favorite({ post }: { post: Post }) {
  const { toggleFavorite, favoritesItems } = useFavoritePosts()
  const findFavorite = favoritesItems.find(item => item.id === post.id)

  return (
    <IconButton
      color={findFavorite ? 'primary' : 'secondary'}
      icon="BsBookmark"
      size="17"
      onClick={() => toggleFavorite(post)}
    />
  )
}
