import { AddressType } from '@/features/address/types/address.type'
import { UserType } from '@/features/authentication/types/user.type'
import { ProductType } from '@/features/product/types/product.type'
import { ResponseSuccessListType, ResponseSuccessType } from '@/utils/type.util'

export type OrderType = {
  _id: string
  user: UserType
  products: {
    product: ProductType
    quantity: number
    origin_price: number
    price: number
    discount: number
  }[]
  total_cost: number
  shipping_fee: number
  direct_discount: number
  shipping_discount: number
  total_payment: number
  total_save: number
  status: string
  shippingAddress: AddressType
  paymentMethod: string
  note: string
  createdAt: string
  updatedAt: string
}

export type OrderStoreType = {
  orders: OrderType[]
  // user
  createOrder: (
    data: Partial<OrderType>,
  ) => Promise<ResponseSuccessType<OrderType>>
  updateOrderById: (
    orderId: string,
    data: Partial<OrderType>,
  ) => Promise<ResponseSuccessType<OrderType>>
  getOrderById: (orderId: string) => Promise<ResponseSuccessType<OrderType>>
  getOrdersByMe: (query?: string) => Promise<ResponseSuccessListType<OrderType>>

  //   // admin
  //   updateOrderStatus: (
  //     orderId: string,
  //     status: string,
  //   ) => Promise<ResponseSuccessType<OderType>>
}
