import 'react-toastify/dist/ReactToastify.css'
import { notFound } from 'next/navigation'
import type { Product } from '@/types/shop'
import { Aside } from '@app/_elements'
import { productService } from '@services'
import { Rating, Stack, Typography } from '@ui'
import { UrlParams, getNoun, text } from '@utils'
import { Slider, AddToCart, Popular } from './_elements'
import styles from './page.module.css'

export async function generateMetadata({ params }: UrlParams) {
  const product: Product = await getProduct(params.productId)

  return {
    title: product.title + ` |  EVO PLACE`,
    description: text.getMetaDescription(product.text),
  }
}

async function getProduct(productId: string) {
  const res = await productService.getOne(+productId)
  if (res.status !== 200) return notFound()

  return res.data
}

async function getPopProducts(urlParams: UrlParams) {
  const res = await productService.getAll(urlParams)

  return { products: res.data, totalCount: res.headers['x-total-count'] }
}

export default async function Product(urlParams: UrlParams) {
  const product = await getProduct(urlParams.params.productId)
  urlParams.searchParams.category = product.category
  const { products } = await getPopProducts(urlParams)

  return (
    <>
      <Stack>
        <div className={styles.container}>
          <div style={{ width: '100%', maxWidth: '700px' }}>
            <Slider product={product} />
          </div>
          <div className={styles.info}>
            <div className={styles.manufacturer}>
              By <span>{product.manufacturer}</span>
            </div>
            <Typography variant="title-1" tag="h1">
              {product.title}
            </Typography>
            {!!product.rating && (
              <div className={styles.rating}>
                <Rating value={product.rating} />{' '}
                <span>
                  ({product.ratingCount}{' '}
                  {getNoun(product.ratingCount, [
                    'review',
                    'reviews',
                    'reviews',
                  ])}
                  )
                </span>
              </div>
            )}
            <div className={styles.quantity}>
              {product.volume} {product.volumeMeasurement}
            </div>
            <AddToCart product={product} />
          </div>
        </div>
        <div className={styles.description}>
          {product.text.split('\n').map((item, i) => (
            <Typography key={i} variant="text" tag="p">
              {item}
            </Typography>
          ))}
        </div>
      </Stack>
      <Aside position="right" width={350}>
        <Popular products={products} />
      </Aside>
    </>
  )
}
