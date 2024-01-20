'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Review } from '@/types/shop'
import defautAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth } from '@store'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeading,
  Icon,
  Rating,
  Stack,
  Typography,
} from '@ui'
import { ReviewForm } from '..'
import styles from './Reviews.module.css'

export function Reviews({
  productId,
  reviews,
}: {
  productId: string
  reviews: Review[]
}) {
  const router = useRouter()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.reviews}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="title-3">Reviews</Typography>
        <Button
          color="primary"
          startIcon={<Icon name="BsPlusLg" />}
          onClick={() => (user ? setOpen(true) : router.push('/login'))}
        >
          Add review
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className={styles.modal}>
            <Stack>
              <DialogHeading>Add review</DialogHeading>
            </Stack>
            <ReviewForm setOpen={setOpen} productId={productId} />
          </DialogContent>
        </Dialog>
      </Stack>
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
