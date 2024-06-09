import { notFound } from 'next/navigation'
import { Page } from '@app/_elements'
import { adminProductService } from '@services'
import { UrlParams } from '@utils'
import { Product } from './_elements'

async function getProduct(productId: string) {
  const res = await adminProductService.getOne(productId)
  if (res.status !== 200) return notFound()
  return res.data
}

export default async function ProductPage(urlParams: UrlParams) {
  const values = await getProduct(urlParams.params!.product!)
  return (
    <Page title="Обновить товар">
      <Product values={values} />
    </Page>
  )
}
