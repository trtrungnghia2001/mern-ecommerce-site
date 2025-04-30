import { UserType } from '@/features/authentication/types/user.type'
import { ProductType } from '@/features/product/types/product.type'
import { ResponseSuccessListType, ResponseSuccessType } from '@/utils/type.util'

export type CartType = {
  _id: string
  user: UserType
  product: ProductType
  quantity: number
}

export type CartStoreType = {
  total_quantity: number
  carts: CartType[]
  addCart: (
    productId: string,
    quantity: number,
  ) => Promise<ResponseSuccessType<CartType>>
  updateCartById: (
    cartId: string,
    data: Partial<CartType>,
  ) => Promise<ResponseSuccessType<CartType>>
  removeCartById: (cartId: string) => Promise<ResponseSuccessType<CartType>>
  removeCartSeclect: (ids: string[]) => Promise<ResponseSuccessType<CartType>>
  getCart: (query?: string) => Promise<ResponseSuccessListType<CartType>>
}
