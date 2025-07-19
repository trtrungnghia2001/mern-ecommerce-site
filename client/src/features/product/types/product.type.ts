import { ResponseSuccessListType, ResponseSuccessType } from '@/utils/type.util'

export type ProductType = {
  _id: string
  name: string
  slug: string
  thumbnail: string
  description: string
  price: number
  original_price: number
  discount: number
  discount_rate: number
  rating_average: number
  origin?: string
  images: string[]
  categories?: string
  brand?: string
  highlight: string[]
  quantity_sold: number
  review_count: number
  status: boolean
  createdAt: string
  updatedAt: string

  isFavorite: boolean
}

export type ProductStoreType = {
  // products: ProductType[]

  // favorite
  product_favorites: ProductType[]
  addFavorite: (productId: string) => Promise<ResponseSuccessType<ProductType>>
  removeFavorite: (
    productId: string,
  ) => Promise<ResponseSuccessType<ProductType>>
  getFavorite: (query?: string) => Promise<ResponseSuccessListType<ProductType>>
  // history
  product_histories: ProductType[]
  addHistory: (productId: string) => Promise<ResponseSuccessType<ProductType>>
  removeHistory: (
    productId: string,
  ) => Promise<ResponseSuccessType<ProductType>>
  getHistory: (query?: string) => Promise<ResponseSuccessListType<ProductType>>
  // product
  products: ProductType[]
  getProducts: (query?: string) => Promise<ResponseSuccessListType<ProductType>>
}
