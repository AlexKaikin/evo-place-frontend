'use client'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Product as ProductType } from '@/types/shop'
import { adminProductService } from '@services'
import { toFormData } from '@utils'
import { ProductForm } from '../../../_elements'

export function Product({ values }: { values: ProductType }) {
  const router = useRouter()
  const handleSubmit = async (data: ProductType) => {
    try {
      await adminProductService.update(data.id, toFormData(data))
      router.push('/admin/products')
      router.refresh()
    } catch (error) {
      toast.info('Something went wrong. Try again!')
    }
  }

  return <ProductForm values={values} handleSubmit={handleSubmit} />
}
