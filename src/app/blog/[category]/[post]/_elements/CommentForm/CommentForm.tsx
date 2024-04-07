'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentService } from '@services'
import { Button, Form, FormInput, FormTextarea, Stack } from '@ui'

type Post = {
  body: string
  post: string
}

const schema = z.object({
  body: z
    .string({ required_error: 'Enter your comment' })
    .min(1, { message: 'Enter your comment' }),
  post: z.string(),
})

export function CommentForm({
  postId,
  setOpen,
}: {
  postId: string
  setOpen: (v: boolean) => void
}) {
  const formMethods = useForm<Post>({
    defaultValues: { body: '', post: postId },
    resolver: zodResolver(schema),
  })

  const handleSubmit = async (data: Post) => {
    try {
      const res = await commentService.create(data)

      if (res.status === 201) {
        setOpen(false)
        toast.info(
          'Your comment has been sent to the administrator for review.'
        )
      }
    } catch (error) {
      toast.info('Something went wrong!')
    }
  }

  return (
    <Form id="reviewForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <Stack direction="column" gap={30}>
        <FormTextarea name="body" rows={5} label="Text" />
        <Stack>
          <FormInput type="hidden" name="rating" />
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={20}>
          <Button type="submit">Send</Button>
          <Button
            type="button"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  )
}
