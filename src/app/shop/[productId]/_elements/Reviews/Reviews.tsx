import dayjs from 'dayjs'
import Image from 'next/image'
import { Review } from '@/types/shop'
import defautAvatar from '@assets/img/user/defaultAvatar.png'
import { Rating, Typography } from '@ui'
import styles from './Reviews.module.css'

export function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className={styles.reviews}>
      <Typography variant="title-3">Reviews</Typography>
      <div>
        {reviews.map(review => (
          <div key={review.id} className={styles.review}>
            <div className={styles.user}>
              <div className={styles.avatar}>
                <Image
                  src={
                    review.user.avatarUrl ? review.user.avatarUrl : defautAvatar
                  }
                  width={70}
                  height={70}
                  alt="avatar"
                />
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.header}>
                <div className={styles.name}>{review.user.fullName}, </div>
                <div className={styles.date}>
                  {dayjs(new Date()).format('H:m, DD.MM.YYYY')}
                </div>
              </div>
              <Rating value={review.rating} />
              {review.body.split('\n').map((item, i) => (
                <Typography key={i} variant="text" tag="p">
                  {item}
                </Typography>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
