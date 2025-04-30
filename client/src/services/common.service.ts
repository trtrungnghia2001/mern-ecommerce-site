import axiosInstance from '@/configs/axios.config'
import { ResponseSuccessType } from '@/utils/type.util'

export async function getBrandApi() {
  const url = `v1/common/brand/get`
  const response = await axiosInstance.get<ResponseSuccessType<string[]>>(url)
  return response.data
}
export async function getOriginApi() {
  const url = `v1/common/origin/get`
  const response = await axiosInstance.get<ResponseSuccessType<string[]>>(url)
  return response.data
}
export async function getCategoryApi() {
  const url = `v1/common/category/get`
  const response = await axiosInstance.get<ResponseSuccessType<string[]>>(url)
  return response.data
}
