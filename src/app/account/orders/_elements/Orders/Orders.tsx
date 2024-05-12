'use client'

import dayjs from 'dayjs'
import { Order } from '@/types/shop'
import { Accordion, AccordionSummary, AccordionDetails, Icon } from '@ui'
import { OrderDetails } from '../OrderDetails/OrderDetails'
import styles from './Orders.module.css'

export function Orders({ orders }: { orders: Order[] }) {
  if (!orders.length) return <div>No orders</div>

  return (
    <div>
      <div className={styles.orders}>
        <div className={styles.thead}>
          <div>№ order</div>
          <div>Created</div>
          <div>Status</div>
        </div>
        <div>
          {orders.map(({ id, created, status }, i) => (
            <Accordion key={id}>
              <AccordionSummary
                id={`panel${id}-header`}
                aria-controls={`panel${id}-content`}
                expandIcon={<Icon name="BsChevronDown" />}
              >
                <div className={styles.tbody}>
                  <div>№ {id}</div>
                  <div>{dayjs(created).format('H:mm, DD.MM.YYYY')}</div>
                  <div>{status}</div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <OrderDetails order={orders[i]} />
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  )
}
