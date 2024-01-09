import cn from 'classnames'
import { Aside } from '@app/_elements'
import { productService } from '@services'
import { Pagination } from '@ui'
import type { UrlParams } from '@utils'
import { Card, Filtration, Sorting } from './_elements'
import styles from './page.module.css'

async function getProducts(urlParams: UrlParams) {
  const res = await productService.getAll(urlParams)

  return { products: res.data, totalCount: res.headers['x-total-count'] }
}

export default async function Shop(urlParams: UrlParams) {
  const productsData = await getProducts(urlParams)
  const [{ products, totalCount }] = await Promise.all([productsData])

  return (
    <>
      <div className={styles.container}>
        <div className={cn(styles.products, styles.content)}>
          {products.map(product => (
            <Card key={product._id} product={product} />
          ))}
        </div>
        <Pagination totalCount={totalCount} />
      </div>
      <Aside position="right" width={250}>
        <Sorting />
        <Filtration />
      </Aside>
    </>
  )
}
