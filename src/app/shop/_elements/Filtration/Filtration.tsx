'use client'

import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  WidgetGroup,
  Widget,
  Stack,
  Checkbox,
  Rating,
  Button,
  Form,
  FormInput,
} from '@ui'
import { scrollToTop } from '@utils'

const schema = z.object({
  q: z.string(),
  manufacturer: z.string(),
  price_gte: z.string(),
  price_lte: z.string(),
})

type FilterDto = {
  q: string
  manufacturer: string
  price_gte: string
  price_lte: string
}

export function Filtration() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const defaultValues = {
    q: searchParams.get('q') || '',
    manufacturer: searchParams.get('manufacturer') || '',
    price_gte: searchParams.get('price_gte') || '',
    price_lte: searchParams.get('price_lte') || '',
    ratings: searchParams.get('ratings') || '',
  }

  const formMethods = useForm<FilterDto>({
    defaultValues,
    resolver: zodResolver(schema),
  })
  const {
    reset,
    formState: { isDirty },
  } = formMethods

  function formReset() {
    let param: keyof typeof defaultValues

    for (param in defaultValues) {
      defaultValues[param] = ''
    }

    reset(defaultValues)

    if (typeof window !== 'undefined') {
      const category = searchParams.get('category') || ''
      const param = category.length ? `?category=${category}` : ''
      router.push(`/shop${param}`)
    }

    scrollToTop()
  }

  const handleSubmit = async (data: FilterDto) => {
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

    const path = window.location.pathname + '?' + queryParams?.toString()
    router.push(path)
    scrollToTop()
  }

  return (
    <Form id="searchForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <WidgetGroup title="Filtration" icon="BsFunnel">
        <Widget title="Price">
          <Stack direction="row" alignItems="center" flexWrap="nowrap" gap={10}>
            <FormInput
              name="price_gte"
              placeholder="0"
              label="from"
              startIcon="BsCurrencyDollar"
            />
            -
            <FormInput
              name="price_lte"
              placeholder="10000"
              label="to"
              startIcon="BsCurrencyDollar"
            />
          </Stack>
        </Widget>
        <Widget title="Ratings">
          <Stack gap={15}>
            <Stack direction="row" alignItems="center" gap={15}>
              <Checkbox />
              <Rating value={5} />
            </Stack>
            <Stack direction="row" alignItems="center" gap={15}>
              <Checkbox />
              <Rating value={4} />
            </Stack>
            <Stack direction="row" alignItems="center" gap={15}>
              <Checkbox />
              <Rating value={3} />
            </Stack>
            <Stack direction="row" alignItems="center" gap={15}>
              <Checkbox />
              <Rating value={2} />
            </Stack>
            <Stack direction="row" alignItems="center" gap={15}>
              <Checkbox />
              <Rating value={1} />
            </Stack>
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
