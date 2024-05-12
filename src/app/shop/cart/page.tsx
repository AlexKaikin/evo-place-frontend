'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { z } from 'zod'
import { CreateOrder } from '@/types/shop/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { orderService } from '@services'
import { useAuth, useCart, useLangs } from '@store'
import {
  Button,
  Form,
  FormInput,
  Icon,
  IconButton,
  Input,
  Stack,
  Typography,
  Widget,
} from '@ui'
import { getLocalStorage } from '@utils'
import styles from './page.module.css'

export default function Cart() {
  const { user } = useAuth()
  const router = useRouter()
  const { lang, translate } = useLangs()
  const {
    cartItems,
    totalCost,
    deleteCartItem,
    decriment,
    increment,
    changeQuantity,
  } = useCart()

  const schema = z.object({
    region: z
      .string({
        required_error: translate[lang].shop.cart.required_error,
      })
      .min(1, {
        message: translate[lang].shop.cart.required_error,
      }),
    city: z
      .string({
        required_error: translate[lang].shop.cart.required_error,
      })
      .min(1, {
        message: translate[lang].shop.cart.required_error,
      }),
    street: z
      .string({
        required_error: translate[lang].shop.cart.required_error,
      })
      .min(1, {
        message: translate[lang].shop.cart.required_error,
      }),
    home: z
      .string({
        required_error: translate[lang].shop.cart.required_error,
      })
      .min(1, {
        message: translate[lang].shop.cart.required_error,
      }),
    index: z.coerce
      .number({
        required_error: translate[lang].shop.cart.required_error,
      })
      .min(1, {
        message: translate[lang].shop.cart.required_error,
      }),
    name: z
      .string({
        required_error: translate[lang].shop.cart.required_error,
      })
      .min(1, {
        message: translate[lang].shop.cart.required_error,
      }),
    surname: z
      .string({
        required_error: translate[lang].shop.cart.required_error,
      })
      .min(1, {
        message: translate[lang].shop.cart.required_error,
      }),
    middleName: z
      .string({
        required_error: translate[lang].shop.cart.required_error,
      })
      .min(1, {
        message: translate[lang].shop.cart.required_error,
      }),
  })

  const formMethods = useForm<CreateOrder>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = async (data: CreateOrder) => {
    try {
      data.cartItems = getLocalStorage('cart') || []
      data.totalCost = totalCost
      await orderService.create(data)
      router.push('/account/orders')
    } catch (error) {
      toast.info('Something went wrong. Try again!')
    }
  }

  if (!cartItems.length) redirect('/shop')

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          {!user && (
            <div className={styles.notification}>
              <Icon name="BsExclamationCircleFill" />
              <p>
                {translate[lang].shop.cart.notification}
                <Link href={'/register'}>
                  {translate[lang].shop.cart.register}
                </Link>
                <Link href={'/login'}>{translate[lang].shop.cart.login}</Link>
              </p>
            </div>
          )}
          <Typography variant="title-3" tag="h1">
            {translate[lang].shop.cart.cart}
          </Typography>
          <div className={styles.productsContainer}>
            <div className={styles.products}>
              {cartItems?.map(
                ({ _id, imgUrl, title, category, quantity, cost }) => (
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
                      <Link href={`/shop/${category.toLowerCase()}/${_id}`}>
                        {title}
                      </Link>
                    </div>
                    <div className={styles.quantityContainer}>
                      <div className={styles.quantity}>
                        <IconButton
                          icon="BsDashLg"
                          onClick={() => decriment(_id)}
                        />
                        <Input
                          type="number"
                          onChange={e => changeQuantity(_id, +e.target.value)}
                          value={quantity}
                          align="center"
                        />
                        <IconButton
                          icon="BsPlusLg"
                          onClick={() => increment(_id)}
                        />
                      </div>
                    </div>
                    <div className={styles.cost}>${cost}</div>
                    <div className={styles.delete}>
                      <IconButton
                        color="error"
                        icon="BsTrash3"
                        size="17"
                        onClick={() => deleteCartItem(_id)}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <Form id="orderForm" formMethods={formMethods} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.col}>
              <Widget
                title={translate[lang].shop.cart.receivingAddress}
                className={styles.widget}
              >
                <Stack
                  gap={40}
                  className={cn(styles.receiving, {
                    [styles['disable']]: !user,
                  })}
                >
                  <FormInput
                    name="region"
                    label={translate[lang].shop.cart.country}
                    placeholder="Russia"
                    disabled={!user}
                  />
                  <FormInput
                    name="city"
                    label={translate[lang].shop.cart.city}
                    placeholder="Moscow"
                    disabled={!user}
                  />
                  <FormInput
                    name="street"
                    label={translate[lang].shop.cart.street}
                    placeholder="Lenina"
                    disabled={!user}
                  />
                  <FormInput
                    name="home"
                    label={translate[lang].shop.cart.house}
                    placeholder="14"
                    disabled={!user}
                  />
                  <FormInput
                    label={translate[lang].shop.cart.apartment}
                    placeholder="3"
                    disabled={!user}
                  />
                  <FormInput
                    name="index"
                    type="number"
                    label={translate[lang].shop.cart.postalCode}
                    placeholder="725538"
                    disabled={!user}
                  />
                </Stack>
              </Widget>
            </div>
            <div className={styles.col}>
              <Widget
                title={translate[lang].shop.cart.recipientDetails}
                className={styles.widget}
              >
                <Stack
                  gap={40}
                  className={cn(styles.recipient, {
                    [styles['disable']]: !user,
                  })}
                >
                  <FormInput
                    name="surname"
                    label={translate[lang].shop.cart.lastName}
                    placeholder="Abramov"
                    disabled={!user}
                  />
                  <FormInput
                    name="name"
                    label={translate[lang].shop.cart.firstName}
                    placeholder="Alex"
                    disabled={!user}
                  />
                  <FormInput
                    name="middleName"
                    label={translate[lang].shop.cart.middleName}
                    placeholder=""
                    disabled={!user}
                  />
                </Stack>
              </Widget>

              <Widget
                title={translate[lang].shop.cart.orderSummery}
                className={styles.widget}
              >
                <Stack gap={20} className={styles.orderSummer}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    gap={10}
                  >
                    <div>{translate[lang].shop.cart.totalProducts}</div>{' '}
                    <span className={styles.divider}></span>{' '}
                    <div>{cartItems.length}</div>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    gap={10}
                  >
                    <div>{translate[lang].shop.cart.discount}</div>{' '}
                    <span className={styles.divider}></span> <div>0%</div>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    gap={10}
                  >
                    <div>{translate[lang].shop.cart.orderAmount}</div>{' '}
                    <span className={styles.divider}></span>{' '}
                    <div>${totalCost}</div>
                  </Stack>
                  <br />
                  <Stack direction="row" gap={10}>
                    <FormInput
                      label={translate[lang].shop.cart.coupon}
                      placeholder="KGDHJGJKJ"
                    />
                    <Button type="button">
                      {translate[lang].shop.cart.apply}
                    </Button>
                  </Stack>
                  <Button isFullWidth type="submit">
                    {translate[lang].shop.cart.placeAnOrder}
                  </Button>
                </Stack>
              </Widget>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}
