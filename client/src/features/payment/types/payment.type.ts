import { AddressType } from '@/features/address/types/address.type'
import { ProductType } from '@/features/product/types/product.type'

export type PaymentType = {
  product: ProductType
  quantity: number
}
export type PaymentSotreType = {
  payments: PaymentType[]
  addPayment: (payments: PaymentType[]) => void
  removePayment: () => void
  shippingAddress: AddressType | null
  setShippingAddress: (address: AddressType) => void
}
