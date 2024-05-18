'use client'

import cn from 'classnames'
import { useFavoritePosts } from '@store'
import { Typography } from '@ui'
import { Card } from '../_elements'
import styles from './page.module.css'

export default function Favorites() {
  const { favoritesItems } = useFavoritePosts()

  if (!favoritesItems.length)
    return (
      <div className={styles.container}>
        <Typography variant="title3" tag="h1">
          Favorite posts
        </Typography>
        <div>Empty</div>
      </div>
    )

  return (
    <div className={styles.container}>
      <Typography variant="title3" tag="h1">
        Favorite posts
      </Typography>
      <div className={cn(styles.posts, styles.content)}>
        {favoritesItems?.map(post => <Card key={post.id} post={post} />)}
      </div>
    </div>
  )
}
