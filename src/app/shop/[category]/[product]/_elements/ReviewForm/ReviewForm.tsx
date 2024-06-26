'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { reviewService } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLangs } from '@store'
import {
  Button,
  Form,
  FormInput,
  FormTextarea,
  Menu,
  MenuItem,
  Stack,
} from '@ui'
import styles from './ReviewForm.module.css'

type Review = {
  body: string
  rating: number
  product: string
}

export function ReviewForm({ productId }: { productId: string }) {
  const { lang, translate } = useLangs()
  const [ratings, setRatigns] = useState(translate[lang].shop.product.choose)

  const schema = z.object({
    body: z
      .string({
        required_error:
          translate[lang].shop.product.reviewBodyValidate.required_error,
      })
      .min(1, {
        message: translate[lang].shop.product.reviewBodyValidate.message,
      }),
    rating: z
      .number({
        required_error:
          translate[lang].shop.product.reviewRatingValidate.required_error,
      })
      .min(0, {
        message: translate[lang].shop.product.reviewRatingValidate.message,
      }),
    product: z.string(),
  })

  const formMethods = useForm<Review>({
    defaultValues: { body: '', rating: -1, product: productId },
    resolver: zodResolver(schema),
  })

  const { setValue, reset } = formMethods

  function handleRaiting(rs: string, rn: number) {
    setRatigns(rs)
    setValue('rating', rn, { shouldValidate: true })
  }

  const handleSubmit = async (data: Review) => {
    try {
      await reviewService.create(data)
      toast.info(translate[lang].shop.product.sendReviewInfo)
      reset()
      setRatigns(translate[lang].shop.product.choose)
    } catch (error) {
      toast.info(translate[lang].shop.product.sendReviewError)
    }
  }

  return (
    <Form
      id="reviewForm"
      formMethods={formMethods}
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <FormTextarea
        name="body"
        rows={5}
        label={translate[lang].shop.product.text}
      />

      <Stack>
        <Stack direction="row" alignItems="center" gap={10}>
          {translate[lang].shop.product.rating}{' '}
          <Menu
            variant="text"
            label={ratings}
            color="primary"
            defaultValue={'asd'}
          >
            <MenuItem
              label={translate[lang].shop.product.unrated}
              onClick={() =>
                handleRaiting(translate[lang].shop.product.unrated, 0)
              }
            />
            <MenuItem
              label={`5 ${translate[lang].shop.product.stars}`}
              onClick={() =>
                handleRaiting(`5 ${translate[lang].shop.product.stars}`, 5)
              }
            />
            <MenuItem
              label={`4 ${translate[lang].shop.product.stars2}`}
              onClick={() =>
                handleRaiting(`4 ${translate[lang].shop.product.stars2}`, 4)
              }
            />
            <MenuItem
              label={`3 ${translate[lang].shop.product.stars2}`}
              onClick={() =>
                handleRaiting(`3 ${translate[lang].shop.product.stars2}`, 3)
              }
            />
            <MenuItem
              label={`2 ${translate[lang].shop.product.stars2}`}
              onClick={() =>
                handleRaiting(`2 ${translate[lang].shop.product.stars2}`, 2)
              }
            />
            <MenuItem
              label={`1 ${translate[lang].shop.product.star}`}
              onClick={() =>
                handleRaiting(`1 ${translate[lang].shop.product.star}`, 1)
              }
            />
          </Menu>
        </Stack>
        <FormInput type="hidden" name="rating" />
      </Stack>

      <Stack direction="row" justifyContent="space-between" gap={20}>
        <Button type="submit">{translate[lang].shop.product.send}</Button>
      </Stack>
    </Form>
  )
}
