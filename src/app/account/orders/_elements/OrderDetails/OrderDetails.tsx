'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Order } from '@/types/shop'
import { Typography } from '@ui'
import styles from './OrderDetails.module.css'

export function OrderDetails({ order }: { order: Order }) {
  const { cartItems, totalCost } = order

  return (
    <div className={styles.detail}>
      <div className={styles.productsContainer}>
        <div className={styles.products}>
          {cartItems.map(({ _id, imgUrl, title, quantity, cost }) => (
            <div key={_id} className={styles.product}>
              <div className={styles.imgContainer}>
                <Image
                  fill
                  sizes="(max-width: 1800px) 33vw"
                  src={imgUrl}
                  alt={title}
                />
              </div>
              <div className={styles.title}>
                <Link href={`/shop/${_id}`}>{title}</Link>
              </div>
              <div className={styles.quantityContainer}>
                <div className={styles.quantity}>
                  {quantity} <span>ea</span>
                </div>
              </div>
              <div className={styles.cost}>
                <span>costs</span> ${cost}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.total}>
          <div>
            Total products <span>{cartItems.length}</span>
          </div>
          <div>
            Order amount <span>${totalCost}</span>
          </div>
        </div>

        <div className={styles.contacts}>
          <div className={styles.column}>
            <Typography variant="title-3">Recipient</Typography>
            <div className={styles.field}>
              <label>Surname</label>
              <p>{order.surname}</p>
            </div>
            <div className={styles.field}>
              <label>Name</label>
              <p>{order.name}</p>
            </div>
            <div className={styles.field}>
              <label>Middle name</label>
              <p>{order.middleName}</p>
            </div>
          </div>
          <div className={styles.column}>
            <Typography variant="title-3">Address</Typography>
            <div className={styles.field}>
              <label>Region</label>
              <p>{order.region}</p>
            </div>
            <div className={styles.field}>
              <label>City</label>
              <p>{order.city}</p>
            </div>
            <div className={styles.field}>
              <label>Street</label>
              <p>{order.street}</p>
            </div>
            <div className={styles.field}>
              <label>Home</label>
              <p>{order.home}</p>
            </div>
            <div className={styles.field}>
              <label>Index</label>
              <p>{order.index}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
