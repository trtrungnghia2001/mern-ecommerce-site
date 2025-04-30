import axiosInstance from '@/configs/axios.config'

import { NotificationType } from '@/features/notification/types/notification.type'
import { ResponseSuccessListType } from '@/utils/type.util'

export async function getNotificationsApi(query?: string) {
  const url = `v1/notification/get-me?${query}`
  const response = (
    await axiosInstance.get<ResponseSuccessListType<NotificationType>>(url)
  ).data
  return response
}
