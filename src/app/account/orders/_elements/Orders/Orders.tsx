'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import { Order } from '@/types/shop'
import { Dialog, DialogContent, DialogHeading, Button, Stack } from '@ui'
import { OrderDetails } from '../OrderDetails/OrderDetails'
import styles from './Orders.module.css'

export function Orders({ orders }: { orders: Order[] }) {
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState<Order | null>(null)

  const handleShowDetails = (order: Order) => {
    setOpen(true)
    setOrder(order)
  }

  if (!orders.length) return <div>No orders</div>

  return (
    <div>
      <div className={styles.orders}>
        <div className={styles.header}>
          <div>№ order</div>
          <div>Created</div>
          <div>Status</div>
        </div>
        <OrdersList orders={orders} handleShowDetails={handleShowDetails} />
      </div>

      {order && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeading>Order №{order.id} details</DialogHeading>
            <OrderDetails order={order} />
            <Stack isWide alignItems="flex-end">
              <Button color="secondary" onClick={() => setOpen(false)}>
                Close
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function OrdersList({
  orders,
  handleShowDetails,
}: {
  orders: Order[]
  handleShowDetails: (order: Order) => void
}) {
  return (
    <>
      {orders.map(({ id, created, status }, i) => (
        <div key={id} className={styles.order}>
          <button onClick={() => handleShowDetails(orders[i])}>
            Order №{id}
          </button>
          <div>{dayjs(created).format('H:m, DD.MM.YYYY')}</div>
          <div>{status}</div>
        </div>
      ))}
    </>
  )
}
