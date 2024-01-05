'use client'

import { useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { Product } from '@/types/shop/product'
import { IconButton } from '@ui'
import styles from './Slider.module.css'

type Props = {
  product: Product
}

export function Slider({ product }: Props) {
  const [imgActive, setImgActive] = useState(product?.imgUrl)

  return (
    <div className={styles.slider}>
      <div className={styles.carousel}>
        <IconButton icon="BsChevronUp" disabled />
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselImgs} style={{ top: '0px' }}>
            <div
              className={cn(styles.carouselImg, {
                [styles['active']]: imgActive === product.imgUrl,
              })}
            >
              <Image
                src={product.imgUrl}
                fill
                sizes="(max-width: 1800px) 33vw"
                onClick={() => setImgActive(product.imgUrl)}
                alt="Картинка не загрузилась"
              />
            </div>
            {product.galleryUrl?.map(item => (
              <div
                key={item.toString()}
                className={cn(styles.carouselImg, {
                  [styles['active']]: imgActive === item,
                })}
              >
                <Image
                  src={item}
                  fill
                  sizes="(max-width: 1800px) 33vw"
                  onClick={() => setImgActive(item)}
                  alt="Картинка не загрузилась"
                />
              </div>
            ))}
          </div>
        </div>
        <IconButton icon="BsChevronDown" />
      </div>
      <div className={styles.activeImg}>
        <Image
          src={imgActive}
          fill
          sizes="(max-width: 1800px) 50vw"
          alt="Картинка не загрузилась"
        />
      </div>
    </div>
  )
}
