import { Metadata } from 'next'
import { accountOrderService } from '@services'
import { Pagination } from '@ui'
import type { UrlParams } from '@utils'
import { Orders } from './_elements'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Orders |  EVO PLACE',
  description: 'Orders...',
}

async function getOrders(UrlParams: UrlParams) {
  const res = await accountOrderService.getAll(UrlParams)
  const orders = res.data
  const totalCount = res.headers['x-total-count']
  return { orders, totalCount }
}

export default async function Page(UrlParams: UrlParams) {
  const { orders, totalCount } = await getOrders(UrlParams)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Orders orders={orders} />
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  )
}
