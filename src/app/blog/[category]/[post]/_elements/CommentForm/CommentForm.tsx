'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentService } from '@services'
import { Button, Form, FormInput, FormTextarea } from '@ui'
import styles from './CommentForm.module.css'

type Post = {
  body: string
  post: string
}

const schema = z.object({
  body: z
    .string({ required_error: 'Required' })
    .min(1, { message: 'Required' }),
  post: z.string(),
})

export function CommentForm({ postId }: { postId: string }) {
  const formMethods = useForm<Post>({
    defaultValues: { body: '', post: postId },
    resolver: zodResolver(schema),
  })
  const { reset } = formMethods

  const handleSubmit = async (data: Post) => {
    try {
      await commentService.create(data)
      toast.info('Your comment has been sent to the administrator for review.')
      reset()
    } catch (error) {
      toast.info('Something went wrong!')
    }
  }

  return (
    <Form
      id="reviewForm"
      formMethods={formMethods}
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <FormTextarea name="body" rows={5} label="Text" />
      <FormInput type="hidden" name="rating" />
      <Button type="submit">Send</Button>
    </Form>
  )
}
