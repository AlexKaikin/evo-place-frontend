'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Comment } from '@/types/blog'
import defautAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth } from '@store'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeading,
  Stack,
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
  const router = useRouter()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.comments}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="title-3">Comments</Typography>
        <Button
          color="primary"
          onClick={() => (user ? setOpen(true) : router.push('/login'))}
        >
          Add comment
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className={styles.modal}>
            <Stack>
              <DialogHeading>Add comment</DialogHeading>
            </Stack>
            <CommentForm setOpen={setOpen} postId={postId} />
          </DialogContent>
        </Dialog>
      </Stack>
      <div>
        {comments.map(comment => (
          <div key={comment.id} className={styles.review}>
            <div className={styles.user}>
              <div className={styles.avatar}>
                <Image
                  src={
                    comment.user.avatarUrl
                      ? comment.user.avatarUrl
                      : defautAvatar
                  }
                  width={70}
                  height={70}
                  alt="avatar"
                />
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.header}>
                <div className={styles.name}>{comment.user.fullName}, </div>
                <div className={styles.date}>
                  {dayjs(new Date()).format('H:m, DD.MM.YYYY')}
                </div>
              </div>
              {comment.body.split('\n').map((item, i) => (
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
