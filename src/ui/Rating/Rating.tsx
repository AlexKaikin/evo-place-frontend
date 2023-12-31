import { Icon } from '@ui'
import styles from './Rating.module.css'

type Props = {
  value: number
  size?: number
}

export function Rating({ value, size }: Props) {
  let ratingStarFill: string[] = []
  let ratingStar: string[] = []

  if (value > 0) {
    ratingStarFill = Array(value).fill('ratingStarFill')
    if (value < 5) ratingStar = Array(5 - value).fill('ratingStar')
  }

  return (
    <div className={styles.rating}>
      {ratingStarFill.length > 0 &&
        ratingStarFill.map((_, i) => (
          <Icon name="BsStarFill" size={`${size || 15}`} key={i} />
        ))}
      {ratingStar.length > 0 &&
        ratingStar.map((_, i) => (
          <Icon name="BsStar" size={`${size || 15}`} key={i} />
        ))}
    </div>
  )
}
