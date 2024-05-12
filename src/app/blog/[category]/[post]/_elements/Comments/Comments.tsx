'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { Comment } from '@/types/blog'
import defautAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth, useLangs } from '@store'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Icon,
  Typography,
} from '@ui'
import { CommentForm } from '..'
import styles from './Comments.module.css'

export function Comments({
  postId,
  comments,
}: {
  postId: string
  comments: Comment[]
}) {
  const { user } = useAuth()
  const { lang, translate } = useLangs()
  const loginLink = `/login?from=blog/${postId}`

  return (
    <div className={styles.comments}>
      <Accordion shadow={false}>
        <AccordionSummary
          id={`panel-header`}
          aria-controls={`panel-content`}
          expandIcon={
            <Button color="primary" startIcon={<Icon name="BsPlusLg" />}>
              {translate[lang].blog.post.add}
            </Button>
          }
        >
          <Typography variant="title-3">
            {translate[lang].blog.post.comments}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {user ? (
            <CommentForm postId={postId} />
          ) : (
            <div>
              Что бы написать комментарий необходимо{' '}
              <Link href={loginLink} style={{ color: 'var(--primary)' }}>
                авторизоваться <Icon size="14" name="BsLink45Deg" />
              </Link>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
      <div>
        {comments.map(({ _id, user, body }) => (
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
                  {dayjs(new Date()).format('H:mm, DD.MM.YYYY')}
                </div>
              </div>
              {body.split('\n').map((item, i) => (
                <Typography key={i} variant="text" tag="p">
                  {item}
                </Typography>
              ))}
            </div>
          </div>
        ))}
        {!comments.length ? <>No comments. Write first!</> : null}
      </div>
    </div>
  )
}
