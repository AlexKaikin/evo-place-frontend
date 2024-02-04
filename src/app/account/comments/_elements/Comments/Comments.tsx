'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { Comment } from '@/types/blog'
import { Dialog, DialogContent, DialogHeading, DialogClose } from '@ui'
import styles from './Comments.module.css'

export function Comments({ comments }: { comments: Comment[] }) {
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState<Comment | null>(null)

  const handleShowDetails = (comment: Comment) => {
    setOpen(true)
    setComment(comment)
  }

  if (!comments.length) return <div>No comments</div>

  return (
    <div>
      <div className={styles.comments}>
        <div className={styles.header}>
          <div>Comment</div>
          <div>Created</div>
          <div>Status</div>
        </div>
        <CommentsList
          comments={comments}
          handleShowDetails={handleShowDetails}
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeading>Comment details</DialogHeading>
          <div className={styles.detail}>
            <CommentsText text={comment?.body || ''} />
            <div className="item">
              Article{' '}
              <Link href={`/blog/${comment?.post._id}`} className={styles.link}>
                {comment?.post.title}
              </Link>
            </div>
          </div>

          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CommentsList({
  comments,
  handleShowDetails,
}: {
  comments: Comment[]
  handleShowDetails: (comment: Comment) => void
}) {
  return (
    <>
      {comments.map(({ id, body, created, published }, i) => (
        <div key={id} className={styles.comment}>
          <button onClick={() => handleShowDetails(comments[i])}>
            {body.slice(0, 50) + '...'}
          </button>
          <div>{dayjs(created).format('H:m, DD.MM.YYYY')}</div>
          <div>{published}</div>
        </div>
      ))}
    </>
  )
}

function CommentsText({ text }: { text: string }) {
  return (
    <div>
      {text.split('\n').map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}
