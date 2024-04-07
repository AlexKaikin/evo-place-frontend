'use client'

import { useParams, usePathname } from 'next/navigation'
import { Aside } from '@/app/_elements'
import { Filtration, Sorting } from '..'

export function Sidebar() {
  const { product } = useParams<{ product?: string }>()
  const pathname = usePathname()
  const pages = pathname.split('/')
  const ignore = ['cart', 'compare', 'favorites']
  const check = ignore.find(page => pages.includes(page))

  if (check || product) return null

  return (
    <Aside position="right" width={250} hideInMobile>
      <Sorting />
      <Filtration />
    </Aside>
  )
}
