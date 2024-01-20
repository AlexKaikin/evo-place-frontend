'use client'

import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  WidgetGroup,
  Widget,
  Stack,
  Rating,
  Button,
  Form,
  FormInput,
  FormCheckbox,
} from '@ui'
import { scrollToTop } from '@utils'

const schema = z.object({
  q: z.string(),
  manufacturer: z.string(),
  price_gte: z.string(),
  price_lte: z.string(),
  ratings: z.string(),
})

type FilterDto = {
  q: string
  manufacturer: string
  price_gte: string
  price_lte: string
  ratings: string
}

export function Filtration({ action }: { action?: () => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [ratings, setRatings] = useState<number[]>(
    searchParams
      .get('ratings')
      ?.split(',')
      .map(item => +item) || []
  )

  const defaultValues = useMemo(
    () => ({
      q: '',
      manufacturer: '',
      price_gte: '',
      price_lte: '',
      ratings: '',
    }),
    []
  )

  const currentValues = useMemo(
    () => ({
      q: searchParams.get('q') || '',
      manufacturer: searchParams.get('manufacturer') || '',
      price_gte: searchParams.get('price_gte') || '',
      price_lte: searchParams.get('price_lte') || '',
      ratings: searchParams.get('ratings') || '',
    }),
    [searchParams]
  )

  const formMethods = useForm<FilterDto>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  const {
    reset,
    setValue,
    formState: { isDirty },
  } = formMethods

  function formReset() {
    let param: keyof typeof defaultValues

    for (param in defaultValues) {
      defaultValues[param] = ''
    }

    reset(defaultValues)

    setRatings([])

    if (typeof window !== 'undefined') {
      const category = searchParams.get('category') || ''
      const param = category.length ? `?category=${category}` : ''
      router.push(`/shop${param}`)
    }

    scrollToTop()
  }

  function handleRating(star: number) {
    if (ratings.includes(star)) {
      const value = [...ratings.filter(item => item !== star)]
      setValue('ratings', value.join(','), { shouldDirty: true })
      setRatings(value)
    } else {
      const value = [...ratings, star]
      setValue('ratings', value.join(','), { shouldDirty: true })
      setRatings(value)
    }
  }

  const handleSubmit = async (data: FilterDto) => {
    data.ratings = ratings.join(',')
    let queryParams

    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)
      let param: keyof typeof data

      for (param in data) {
        if (data[param].length) {
          if (queryParams.has(param)) {
            queryParams.set(param, data[param])
          } else {
            queryParams.append(param, data[param])
          }

          if (queryParams.has('_page')) {
            queryParams.set('_page', String(1))
          }
        } else {
          if (queryParams.has(param)) {
            queryParams.delete(param)
          }
        }
      }
    }

    const path = '/shop' + '?' + queryParams?.toString()
    router.push(path)
    scrollToTop()
    action && action()
  }

  useEffect(() => {
    let key: keyof typeof currentValues
    for (key in currentValues) {
      if (currentValues[key] !== defaultValues[key])
        setValue(key, currentValues[key])
    }
  }, [currentValues, defaultValues, setValue])

  return (
    <Form id="searchForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <WidgetGroup title="Filtration" icon="BsFunnel">
        <Widget title="Price">
          <Stack direction="row" alignItems="center" flexWrap="nowrap" gap={10}>
            <FormInput
              type="number"
              name="price_gte"
              placeholder="0"
              label="from"
              startIcon="BsCurrencyDollar"
            />
            -
            <FormInput
              type="number"
              name="price_lte"
              placeholder="10000"
              label="to"
              startIcon="BsCurrencyDollar"
            />
          </Stack>
        </Widget>
        <Widget title="Ratings">
          <Stack gap={15}>
            <FormInput type="hidden" name="ratings" />
            {[5, 4, 3, 2, 1].map(item => (
              <Stack key={item} direction="row" alignItems="center" gap={15}>
                <FormCheckbox
                  checked={ratings.includes(item)}
                  onChange={() => handleRating(item)}
                />
                <Rating value={item} />
              </Stack>
            ))}
          </Stack>
        </Widget>
        <Widget>
          <FormInput name="q" placeholder="Monarh" label="Title" />
        </Widget>
        <Widget>
          <FormInput name="manufacturer" placeholder="Grand" label="Maker" />
        </Widget>
        <Stack gap={10}>
          <Button type="submit" isFullWidth>
            Apply
          </Button>
          {isDirty && (
            <Button
              type="button"
              onClick={formReset}
              color="secondary"
              isFullWidth
            >
              Reset
            </Button>
          )}
        </Stack>
      </WidgetGroup>
    </Form>
  )
}
