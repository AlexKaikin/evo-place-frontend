'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
import { Comment } from '@/types/blog'
import { Accordion, AccordionSummary, AccordionDetails, Icon } from '@ui'
import styles from './Comments.module.css'

export function Comments({ comments }: { comments: Comment[] }) {
  if (!comments.length) return <div>No comments</div>

  return (
    <div>
      <div className={styles.comments}>
        <div className={styles.thead}>
          <div>Comment to</div>
          <div>Created</div>
          <div>Status</div>
        </div>
        <div>
          {comments.map(({ id, created, published, post }, i) => (
            <Accordion key={id}>
              <AccordionSummary
                id={`panel${id}-header`}
                aria-controls={`panel${id}-content`}
                expandIcon={<Icon name="BsChevronDown" />}
              >
                <div key={id} className={styles.tbody}>
                  <div> {post.title}</div>
                  <div>{dayjs(created).format('H:mm, DD.MM.YYYY')}</div>
                  <div>{published}</div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <CommentDetails comment={comments[i]} />
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  )
}

function CommentDetails({ comment }: { comment: Comment }) {
  const text = comment.body.split('\n').map((p, i) => <p key={i}>{p}</p>)
  return (
    <div className={styles.detail}>
      <div>{text}</div>
      <div className="item">
        Link to{' '}
        <Link href={`/blog/${comment?.post._id}`} className={styles.link}>
          {comment?.post.title}
        </Link>
      </div>
    </div>
  )
}
