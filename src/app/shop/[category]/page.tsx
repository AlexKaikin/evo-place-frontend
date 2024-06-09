import cn from 'classnames'
import { productService } from '@services'
import { Pagination, Typography } from '@ui'
import { UrlParams, text } from '@utils'
import { Card } from '../_elements'
import styles from './page.module.css'

export async function generateMetadata({ params }: UrlParams) {
  return {
    title: params?.category + ` |  EVO PLACE`,
    description: text.getMetaDescription(params?.category || ''),
  }
}

async function getProducts(urlParams: UrlParams) {
  const res = await productService.getAll(urlParams)
  return { products: res.data, totalCount: res.headers['x-total-count'] }
}

export default async function Shop(urlParams: UrlParams) {
  const category = urlParams.params?.category
  if (category) urlParams.searchParams.category = category
  const productsData = await getProducts(urlParams)
  const [{ products, totalCount }] = await Promise.all([productsData])

  if (!products.length)
    return (
      <div className={styles.container}>
        <Typography variant="title3" tag="h2" style={{ marginBottom: '0px' }}>
          No products found
        </Typography>
      </div>
    )

  return (
    <div className={styles.container}>
      <div className={cn(styles.products, styles.content)}>
        {products.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <Pagination totalCount={totalCount} />
    </div>
  )
}
