import { UserType } from '@/features/authentication/types/user.type'
import { OrderType } from '@/features/order/types/order.type'

export type NotificationType = {
  _id: string
  user: UserType
  title: string
  message: string
  order: OrderType
  createdAt: Date
  updatedAt: Date
}
