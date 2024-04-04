'use client'

import { useParams } from 'next/navigation'
import { Aside } from '@/app/_elements'
import { Filtration, Sorting } from '..'

export function Sidebar() {
  const { product } = useParams<{ product?: string }>()

  if (product) return null

  return (
    <Aside position="right" width={250} hideInMobile>
      <Sorting />
      <Filtration />
    </Aside>
  )
}
