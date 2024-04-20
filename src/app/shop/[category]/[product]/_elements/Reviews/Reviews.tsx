'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Product, Review } from '@/types/shop'
import defautAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth, useLangs } from '@store'
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
  product,
  reviews,
}: {
  product: Product
  reviews: Review[]
}) {
  const router = useRouter()
  const { user } = useAuth()
  const { _id, category } = product
  const [open, setOpen] = useState(false)
  const { lang, translate } = useLangs()
  const productLink = `/login?from=shop/${category.toLowerCase()}/${_id}`

  return (
    <div className={styles.reviews}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="title-3">
          {translate[lang].shop.product.reviews}
        </Typography>
        <Button
          color="primary"
          startIcon={<Icon name="BsPlusLg" />}
          onClick={() => (user ? setOpen(true) : router.push(productLink))}
        >
          {translate[lang].shop.product.addReview}
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className={styles.modal}>
            <Stack>
              <DialogHeading>
                {translate[lang].shop.product.addReview}
              </DialogHeading>
            </Stack>
            <ReviewForm setOpen={setOpen} productId={_id} />
          </DialogContent>
        </Dialog>
      </Stack>
      <ReviewsList reviews={reviews} />
    </div>
  )
}

function ReviewsList({ reviews }: { reviews: Review[] }) {
  const { lang, translate } = useLangs()

  return (
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
      {!reviews.length ? <>{translate[lang].shop.product.noReviews}</> : null}
    </div>
  )
}
