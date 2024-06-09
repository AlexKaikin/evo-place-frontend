import { Metadata } from 'next'
import { adminProductService } from '@/services'
import { Page } from '@app/_elements'
import { Pagination } from '@ui'
import type { UrlParams } from '@utils'
import { AddProductButton, Products } from './_elements'

export const metadata: Metadata = {
  title: 'Товары | Админ панель | EVO PLACE',
  description: 'Товары...',
}

async function getProducts(urlParams: UrlParams) {
  const res = await adminProductService.getAll(urlParams)
  return { products: res.data, totalCount: res.headers['x-total-count'] }
}

export default async function ProductsPage(urlParams: UrlParams) {
  const productsData = await getProducts(urlParams)
  const [{ products, totalCount }] = await Promise.all([productsData])

  return (
    <Page>
      <AddProductButton />
      <Products products={products} />
      <Pagination totalCount={totalCount} />
    </Page>
  )
}
