'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { reviewService } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Form,
  FormInput,
  FormTextarea,
  Menu,
  MenuItem,
  Stack,
} from '@ui'

type Review = {
  body: string
  rating: number
  product: string
}

const schema = z.object({
  body: z
    .string({ required_error: 'Enter your review' })
    .min(1, { message: 'Enter your review' }),
  rating: z
    .number({ required_error: 'Select an option' })
    .min(0, { message: 'Select an option' }),
  product: z.string(),
})

export function ReviewForm({
  productId,
  setOpen,
}: {
  productId: string
  setOpen: (v: boolean) => void
}) {
  const [ratings, setRatigns] = useState('choose')
  const formMethods = useForm<Review>({
    defaultValues: { body: '', rating: undefined, product: productId },
    resolver: zodResolver(schema),
  })

  const { setValue } = formMethods

  function handleRaiting(rs: string, rn: number) {
    setRatigns(rs)
    setValue('rating', rn)
  }

  const handleSubmit = async (data: Review) => {
    try {
      const res = await reviewService.create(data)

      if (res.status === 201) {
        setOpen(false)
        toast.info('Your review has been sent to the administrator for review.')
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
          <Stack direction="row" alignItems="center" gap={10}>
            Your rating{' '}
            <Menu label={ratings} color="primary">
              <MenuItem
                label="unrated"
                onClick={() => handleRaiting('unrated', 0)}
              />
              <MenuItem
                label="5 stars"
                onClick={() => handleRaiting('5 stars', 5)}
              />
              <MenuItem
                label="4 stars"
                onClick={() => handleRaiting('4 stars', 4)}
              />
              <MenuItem
                label="3 stars"
                onClick={() => handleRaiting('3 stars', 3)}
              />
              <MenuItem
                label="2 stars"
                onClick={() => handleRaiting('2 stars', 2)}
              />
              <MenuItem
                label="1 star"
                onClick={() => handleRaiting('1 stars', 1)}
              />
            </Menu>
          </Stack>
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
