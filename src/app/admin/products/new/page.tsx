'use client'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Page } from '@/app/_elements'
import { CreateProduct, Product } from '@/types/shop'
import { adminProductService } from '@services'
import { toFormData } from '@utils'
import { ProductForm } from '../_elements'

export default function NewProduct() {
  const router = useRouter()
  const values = {
    title: '',
    imgUrl: '/uploads/sdf.jpg',
    galleryUrl: [],
    volume: undefined,
    volumeMeasurement: 'грамм',
    currency: 'руб.',
    price: undefined,
    inStock: 0,
    category: '',
    rating: undefined,
    ratingCount: undefined,
    manufacturer: '',
    property: { country: '', town: '', year: undefined },
    text: '',
    published: false,
  } as unknown as Product

  const handleSubmit = async (data: CreateProduct) => {
    try {
      await adminProductService.create(toFormData(data) as unknown as Product)
      router.push('/admin/products')
      router.refresh()
    } catch (error) {
      toast.info('Something went wrong. Try again!')
    }
  }

  return (
    <Page title="Добавить товар">
      <ProductForm values={values} handleSubmit={handleSubmit} />
    </Page>
  )
}
