'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { Review } from '@/types/shop'
import { Dialog, DialogContent, DialogHeading, DialogClose, Rating } from '@ui'
import styles from './Reviews.module.css'

export function Reviews({ reviews }: { reviews: Review[] }) {
  const [open, setOpen] = useState(false)
  const [review, setReview] = useState<Review | null>(null)

  const handleShowDetails = (review: Review) => {
    setOpen(true)
    setReview(review)
  }

  if (!reviews.length) return <div>No reviews</div>

  return (
    <div>
      <div className={styles.reviews}>
        <div className={styles.header}>
          <div>Review</div>
          <div>Created</div>
          <div>Status</div>
        </div>
        <ReviewsList reviews={reviews} handleShowDetails={handleShowDetails} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeading>Review details</DialogHeading>
          <div className={styles.detail}>
            {review?.rating ? <Rating value={review.rating} /> : null}
            <ReviewText text={review?.body || ''} />
            <div className="item">
              Article{' '}
              <Link
                href={`/shop/${review?.product.category}/${review?.product._id}`}
                className={styles.link}
              >
                {review?.product.title}
              </Link>
            </div>
          </div>

          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ReviewsList({
  reviews,
  handleShowDetails,
}: {
  reviews: Review[]
  handleShowDetails: (review: Review) => void
}) {
  return (
    <>
      {reviews.map(({ id, body, created, published }, i) => (
        <div key={id} className={styles.review}>
          <button onClick={() => handleShowDetails(reviews[i])}>
            {body.slice(0, 50) + '...'}
          </button>
          <div>{dayjs(created).format('H:m, DD.MM.YYYY')}</div>
          <div>{published}</div>
        </div>
      ))}
    </>
  )
}

function ReviewText({ text }: { text: string }) {
  return (
    <div>
      {text.split('\n').map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}
