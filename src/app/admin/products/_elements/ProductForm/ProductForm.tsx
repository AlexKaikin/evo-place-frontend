'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { z } from 'zod'
import { Product } from '@/types/shop'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Form,
  FormCheckbox,
  FormFile,
  FormInput,
  FormTextarea,
  IconButton,
} from '@ui'
import styles from './ProductForm.module.css'

const required_error = 'Required'
const message = 'Required'
const invalid_type_error = 'Required'

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message }),
  price: z.coerce
    .number({ required_error, invalid_type_error })
    .gte(1, { message: 'Должно быть Больше 0' }),
  inStock: z.coerce
    .number({ required_error, invalid_type_error })
    .gte(0, { message: 'Должно быть 0 или больше' }),
  manufacturer: z.string().min(1, { message }),
  volume: z.coerce
    .number({ required_error, invalid_type_error })
    .gte(1, { message: 'Должно быть Больше 0' }),
  volumeMeasurement: z.string().min(1, { message }),
  currency: z.string().min(1, { message }),
  property: z.object({
    country: z.string().min(1, { message }),
    town: z.string().min(1, { message }),
    year: z.coerce
      .number({ required_error, invalid_type_error })
      .gte(1, { message: 'Должно быть Больше 0' }),
  }),
  text: z.string().min(1, { message }),
  category: z.string().min(1, { message }),
  imgUrl: z.string().min(1, { message }),
  galleryUrl: z.array(z.string()),
  published: z.boolean(),
  files: z
    .instanceof(typeof window === 'undefined' ? File : FileList)
    .optional(),
})

type Props = { values: Product; handleSubmit: (data: Product) => void }

export function ProductForm({ values, handleSubmit }: Props) {
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const formMethods = useForm<Product & { files: FileList | null }>({
    defaultValues: values,
    resolver: zodResolver(schema),
  })
  const { watch, formState, setValue, getValues } = formMethods
  const { isDirty } = formState

  function toFileList(files: File[]) {
    const dataTransfer = new DataTransfer()
    files.forEach(file => dataTransfer.items.add(file))
    return dataTransfer.files
  }

  function removeFile(src: string, index: number) {
    const files = Array.from(getValues('files') || [])
    files.splice(index, 1)
    const galleryUrl = getValues('galleryUrl').filter(value => value !== src)
    setFilePreviews(prevState => prevState.filter(file => file !== src))
    setValue('files', toFileList(files), { shouldDirty: true })
    setValue('galleryUrl', galleryUrl)
  }

  const handleChangeFile = (files: FileList) => {
    if (files) {
      Array.from(files as Iterable<File>).forEach(file => {
        if (!file.type.startsWith('image/')) {
          return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
          setFilePreviews(prevState => [...prevState, reader.result as string])
        }

        reader.readAsDataURL(file)
      })
    }
    const prevFileList = Array.from(getValues('files') || [])
    const fileList = toFileList([
      ...prevFileList,
      ...Array.from(files as Iterable<File>),
    ])
    setValue('files', fileList || null, { shouldDirty: true })
  }

  return (
    <Form
      id="productForm"
      formMethods={formMethods}
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <div className={styles.row}>
        <div className={styles.col}>
          <div>Описание</div>
          <FormInput name="title" label="Заголовок" />

          <div className={styles.row}>
            <div className={styles.col}>
              <FormInput name="manufacturer" label="Производитель" />
            </div>
            <div className={styles.col}>
              <FormInput name="category" label="Категория" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <FormInput name="price" label="Цена" />
            </div>
            <div className={styles.col}>
              <FormInput name="currency" label="Валюта" />
            </div>
            <div className={styles.col}>
              <FormInput name="inStock" label="Количество" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <FormInput name="volume" label="Объём" />
            </div>
            <div className={styles.col}>
              <FormInput name="volumeMeasurement" label="Измерение объема" />
            </div>
          </div>

          <FormCheckbox
            name="published"
            defaultChecked={watch('published')}
            label="Опубликовать"
          />
        </div>
        <div className={styles.col}>
          <div className={styles.col}>
            <div>Фотогалерея</div>
            <div>
              <div className={styles.gallery}>
                {[...watch('galleryUrl'), ...filePreviews].map((src, index) => (
                  <div key={index} className={styles.imgContainer}>
                    <Image
                      fill
                      sizes="(max-width: 1800px) 50vw"
                      src={src}
                      alt="фото"
                    />
                    <div className={styles.removeImg}>
                      <IconButton
                        type="button"
                        color="error"
                        icon="BsTrash3"
                        size="14"
                        onClick={() => removeFile(src, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <FormFile onChange={handleChangeFile} accept="image/*" multiple />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <div>Характеристики</div>
          <div className={styles.row}>
            <div className={styles.col}>
              <FormInput name="property.country" label="Страна" />
            </div>
            <div className={styles.col}>
              <FormInput name="property.town" label="Город" />
            </div>
            <div className={styles.col}>
              <FormInput name="property.year" label="Год" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <FormTextarea name="text" label="Описание" rows={8} />
      </div>

      <div className={styles.row}>
        {isDirty && <Button type="submit">Save</Button>}
      </div>
    </Form>
  )
}
