'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { getNoun } from '@/utils'
import { useCompare } from '@store'
import { Button, Rating, Spoiler } from '@ui'
import styles from './page.module.css'

export default function Compare() {
  const { compareItems, toggleCompare } = useCompare()

  if (!compareItems.length) return <div>Empty</div>

  return (
    <div className={cn(styles.products)}>
      {compareItems?.map(product => (
        <div key={product.id} className={styles.product}>
          <div className={styles.imgContainer}>
            <Image
              src={product.imgUrl}
              fill
              sizes="(max-width: 1800px) 50vw"
              alt={product.title}
            />
          </div>
          <Link href={`/shop/${product.category.toLowerCase()}/${product.id}`}>
            {product.title}
          </Link>
          <div>Maker: {product.manufacturer || '-'}</div>
          <div className={styles.rating}>
            <Rating value={product.rating} />{' '}
            <span>
              ({product.ratingCount}{' '}
              {getNoun(product.ratingCount, ['review', 'reviews'])})
            </span>
          </div>
          <div>Country: {product.property.country || '-'}</div>
          <div>City: {product.property.town || '-'}</div>
          <div>Year: {product.property.year || '-'}</div>
          <Spoiler maxHeight={150} showLabel="Show more" hideLabel="Hide">
            {product.text.split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Spoiler>
          <Button
            color="secondary"
            onClick={() => toggleCompare(product)}
            isFullWidth
          >
            Exclude
          </Button>
        </div>
      ))}
    </div>
  )
}
