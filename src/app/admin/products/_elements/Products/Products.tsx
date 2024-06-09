'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { Product } from '@/types/shop'
import { adminProductService } from '@services'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeading,
  Icon,
  Menu,
  MenuItem,
} from '@ui'
import styles from './Products.module.css'

export function Products({ products }: { products: Product[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleConfirm = (id: string) => {
    setOpen(true)
    setDeleteId(id)
  }

  const handleDelete = async () => {
    try {
      await adminProductService.delete(deleteId as string)
      router.refresh()
    } catch (error) {
      toast.info('Something went wrong. Try again!')
    } finally {
      setOpen(false)
      setDeleteId(null)
    }
  }

  return (
    <div className={styles.col}>
      <div className={cn(styles.products)}>
        <div className={styles.product}>
          <div>Заголовок</div>
          <div>Кол-во, шт.</div>
          <div>Цена, руб.</div>
          <div>Опубликован</div>
          <div></div>
          <div></div>
        </div>
        {products.map(product => {
          return (
            <div key={product.id} className={styles.product}>
              <div>{product.title}</div>
              <div>{product.inStock}</div>
              <div>{product.price}</div>
              <div>{product.published ? 'Да' : 'Нет'}</div>
              <div>
                <Menu
                  variant="text"
                  label={<Icon name="BsThreeDotsVertical" />}
                >
                  <MenuItem
                    icon={<Icon size="14" name="BsBoxArrowInUpRight" />}
                    label="Открыть"
                    onClick={() =>
                      router.push(`/shop/${product.category}/${product.id}`)
                    }
                  />
                  <MenuItem
                    icon={<Icon size="14" name="BsPencilSquare" />}
                    label="Редактировать"
                    onClick={() => router.push(`/admin/products/${product.id}`)}
                  />
                  <MenuItem
                    icon={<Icon size="14" name="BsTrash3" />}
                    label="Удалить"
                    onClick={() => handleConfirm(product.id)}
                  />
                </Menu>
              </div>
            </div>
          )
        })}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeading>Удалить товар?</DialogHeading>
            <div className={styles.deleteActions}>
              <Button onClick={handleDelete}>Удалить</Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Отмена
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
