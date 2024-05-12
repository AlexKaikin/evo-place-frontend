'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
import { Review } from '@/types/shop'
import {
  Rating,
  Accordion,
  AccordionSummary,
  Icon,
  AccordionDetails,
} from '@ui'
import styles from './Reviews.module.css'

export function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return <div>No reviews</div>

  return (
    <div>
      <div className={styles.reviews}>
        <div className={styles.thead}>
          <div>Review to</div>
          <div>Created</div>
          <div>Status</div>
        </div>
        <div>
          {reviews.map(({ id, product, created, published }, i) => (
            <Accordion key={id}>
              <AccordionSummary
                id={`panel${id}-header`}
                aria-controls={`panel${id}-content`}
                expandIcon={<Icon name="BsChevronDown" />}
              >
                <div key={id} className={styles.tbody}>
                  <div>{product.title}</div>
                  <div>{dayjs(created).format('H:mm, DD.MM.YYYY')}</div>
                  <div>{published}</div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <ReviewDetails review={reviews[i]} />
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReviewDetails({ review }: { review: Review }) {
  const {
    product: { _id, category, title },
    rating,
    body,
  } = review
  const text = body.split('\n').map((p, i) => <p key={i}>{p}</p>)
  return (
    <div className={styles.detail}>
      {review?.rating ? <Rating value={rating} /> : null}
      <div>{text}</div>
      <div className="item">
        Link to{' '}
        <Link href={`/shop/${category}/${_id}`} className={styles.link}>
          {title}
        </Link>
      </div>
    </div>
  )
}
