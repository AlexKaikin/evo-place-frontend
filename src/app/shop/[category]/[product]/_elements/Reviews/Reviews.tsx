'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { Product, Review } from '@/types/shop'
import defautAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth, useLangs } from '@store'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Icon,
  Rating,
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
  const { user } = useAuth()
  const { id, category } = product
  const { lang, translate } = useLangs()
  const loginLink = `/login?from=shop/${category.toLowerCase()}/${id}`

  return (
    <div className={styles.reviews}>
      <div className={styles.header}>
        <Accordion shadow={false}>
          <AccordionSummary
            id={`panel-header`}
            aria-controls={`panel-content`}
            expandIcon={
              <Button color="primary" startIcon={<Icon name="BsPlusLg" />}>
                {translate[lang].shop.product.addReview}
              </Button>
            }
          >
            <Typography variant="title3">
              {translate[lang].shop.product.reviews}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {user ? (
              <ReviewForm productId={id} />
            ) : (
              <div>
                Что бы написать отзыв необходимо{' '}
                <Link href={loginLink} style={{ color: 'var(--primary)' }}>
                  авторизоваться <Icon size="14" name="BsLink45Deg" />
                </Link>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
      <ReviewsList reviews={reviews} />
    </div>
  )
}

function ReviewsList({ reviews }: { reviews: Review[] }) {
  const { lang, translate } = useLangs()

  return (
    <div>
      {reviews.map(({ _id, user, rating, body, created }) => (
        <div key={_id} className={styles.review}>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <Image
                src={user.avatarUrl || defautAvatar}
                width={70}
                height={70}
                alt="avatar"
              />
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.header}>
              <div className={styles.name}>{user.fullName}, </div>
              <div className={styles.date}>
                {dayjs(new Date(created)).format('H:mm, DD.MM.YYYY')}
              </div>
            </div>
            <Rating value={rating} />
            {body.split('\n').map((item, i) => (
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
