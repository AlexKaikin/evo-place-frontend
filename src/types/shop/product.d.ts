export type Product = {
  id: string
  title: string
  imgUrl: string
  galleryUrl: string[]
  volume: number
  volumeMeasurement: string
  currency: string
  price: number
  inStock: number
  category: string
  rating: number
  ratingCount: number
  manufacturer: string
  property: {
    country: string
    town: string
    year: number
  }
  text: string
  published: boolean
}

export type CreateProduct = Omit<Product, 'id' | 'rating' | 'ratingCount'>
export type UpdateProduct = CreateProduct & { id: string }
