import { UserType } from '@/features/authentication/types/user.type'
import { ProductType } from '@/features/product/types/product.type'
import { ResponseSuccessListType, ResponseSuccessType } from '@/utils/type.util'

export type ReviewType = {
  _id: string
  product: ProductType
  user: UserType
  content: string
  rating: number
  replies: ReviewType[]

  createdAt: string
  updatedAt: string
}

export type ReviewStoreType = {
  reviews: ReviewType[]
  createReview: (
    data: Partial<ReviewType>,
  ) => Promise<ResponseSuccessType<ReviewType>>
  getReviewByProductId: (
    productId: string,
  ) => Promise<ResponseSuccessListType<ReviewType>>
}
