import dayjs from 'dayjs'
import { notFound } from 'next/navigation'
import type { Product } from '@/types/shop'
import { Aside } from '@app/_elements'
import { productService, reviewService } from '@services'
import { Rating, Stack, Typography } from '@ui'
import { UrlParams, getNoun, text } from '@utils'
import { Slider, Actions, Popular, Reviews, Characteristics } from './_elements'
import styles from './page.module.css'

export async function generateMetadata({ params }: UrlParams) {
  const product: Product = await getProduct(params!.id!)

  return {
    title: product.title + ` |  EVO PLACE`,
    description: text.getMetaDescription(product.text),
  }
}

async function getProduct(productId: string) {
  const res = await productService.getOne(productId)
  if (res.status !== 200) return notFound()

  return res.data
}

async function getReviews(productId: string) {
  const res = await reviewService.getAll(productId)
  if (res.status !== 200) return notFound()

  return res.data
}

async function getPopProducts(urlParams: UrlParams) {
  const res = await productService.getAll(urlParams)

  return { products: res.data, totalCount: res.headers['x-total-count'] }
}

export default async function Product(urlParams: UrlParams) {
  const productsData = await getProduct(urlParams.params!.id!)
  const reviewsData = await getReviews(urlParams.params!.id!)
  const [product, reviews] = await Promise.all([productsData, reviewsData])
  urlParams.searchParams.category = product.category
  const { products } = await getPopProducts(urlParams)
  const newProduct = dayjs(new Date()).diff(dayjs(product.id), 'month') < 15
  const popProduct = product.ratingCount > 1

  return (
    <>
      <Stack>
        <div className={styles.container}>
          <div style={{ width: '100%', maxWidth: '700px' }}>
            <Slider product={product} />
          </div>
          <div className={styles.info}>
            <Stack direction="row" justifyContent="space-between" gap={20}>
              <div className={styles.manufacturer}>
                By <span>{product.manufacturer}</span>
              </div>
              <div className={styles.labels}>
                {newProduct && <div className={styles.new}>new</div>}
                {popProduct && <div className={styles.pop}>pop</div>}
              </div>
            </Stack>

            <Typography variant="title-1" tag="h1">
              {product.title}
            </Typography>
            {!!product.rating && (
              <div className={styles.rating}>
                <Rating value={product.rating} />{' '}
                <span>
                  ({product.ratingCount}{' '}
                  {getNoun(product.ratingCount, ['review', 'reviews'])})
                </span>
              </div>
            )}
            <div className={styles.quantity}>
              {product.volume} {product.volumeMeasurement}
            </div>
            <Actions product={product} />
          </div>
        </div>

        <div className={styles.description}>
          <Typography variant="title-3">Description</Typography>
          {product.text.split('\n').map((item, i) => (
            <Typography key={i} variant="text" tag="p">
              {item}
            </Typography>
          ))}
        </div>
        <Characteristics product={product} />
        <Reviews productId={product._id} reviews={reviews} />
      </Stack>
      <Aside position="right" width={350}>
        <Popular products={products} />
      </Aside>
    </>
  )
}
