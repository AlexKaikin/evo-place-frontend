'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Aside } from '@/app/_elements'
import { useCart } from '@store'
import { Button, IconButton, Input, Stack, Typography, Widget } from '@ui'
import styles from './page.module.css'

export default function Cart() {
  const {
    cartItems,
    totalCost,
    deleteCartItem,
    decriment,
    increment,
    changeQuantity,
  } = useCart()

  if (!cartItems.length)
    return (
      <div className={styles.container}>
        <Typography variant="title-3" tag="h1">
          Cart
        </Typography>
        <div>Empty</div>
      </div>
    )

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Typography variant="title-3" tag="h1">
            Cart
          </Typography>
          <div className={styles.productsContainer}>
            <div className={styles.products}>
              {cartItems?.map(product => (
                <div key={product._id} className={styles.product}>
                  <div className={styles.imgContainer}>
                    <Image
                      fill
                      sizes="(max-width: 1800px) 33vw"
                      src={product.imgUrl}
                      alt={product.title}
                    />
                  </div>
                  <div className={styles.title}>
                    <Link href={`/shop/${product._id}`}>{product.title}</Link>
                  </div>
                  <div className={styles.quantityContainer}>
                    <div className={styles.quantity}>
                      <IconButton
                        icon="BsDashLg"
                        onClick={() => decriment(product._id)}
                      />
                      <Input
                        type="number"
                        onChange={e =>
                          changeQuantity(product._id, +e.target.value)
                        }
                        value={product.quantity}
                        align="center"
                      />
                      <IconButton
                        icon="BsPlusLg"
                        onClick={() => increment(product._id)}
                      />
                    </div>
                  </div>
                  <div className={styles.cost}>${product.cost}</div>
                  <div className={styles.delete}>
                    <IconButton
                      color="error"
                      icon="BsTrash3"
                      size="17"
                      onClick={() => deleteCartItem(product._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Aside position="right" width={350}>
        <Widget title="Order Summery">
          <Stack gap={20} className={styles.orderSummer}>
            <Stack direction="row" justifyContent="space-between" gap={10}>
              <div>Total products</div> <span className={styles.divider}></span>{' '}
              <div>{cartItems.length}</div>
            </Stack>
            <Stack direction="row" justifyContent="space-between" gap={10}>
              <div>Discount</div> <span className={styles.divider}></span>{' '}
              <div>0%</div>
            </Stack>
            <Stack direction="row" justifyContent="space-between" gap={10}>
              <div>Order amount</div> <span className={styles.divider}></span>{' '}
              <div>${totalCost}</div>
            </Stack>
            <Stack direction="row" gap={10}>
              <Input placeholder="Coupon" /> <Button>Apply</Button>
            </Stack>
            <Button isFullWidth>Place an order</Button>
          </Stack>
        </Widget>
      </Aside>
    </>
  )
}
