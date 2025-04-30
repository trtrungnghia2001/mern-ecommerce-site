import axiosInstance from '@/configs/axios.config'
import { ProductType } from '@/features/product/types/product.type'
import { ResponseSuccessListType, ResponseSuccessType } from '@/utils/type.util'

export async function productGetApi(query?: string) {
  const url = `v1/product/get?${query}`
  const response = (
    await axiosInstance.get<ResponseSuccessListType<ProductType>>(url)
  ).data
  return response
}
export async function productGetFilterApi(query?: string) {
  const url = `v1/product/get-filter?${query}`
  const response = (
    await axiosInstance.get<ResponseSuccessListType<ProductType>>(url)
  ).data
  return response
}
export async function productGetByViewedApi() {
  const url = `v1/product/get-viewed`
  const response = (
    await axiosInstance.get<ResponseSuccessListType<ProductType>>(url)
  ).data
  return response
}
export async function productGetByInterestedApi() {
  const url = `v1/product/get-interested`
  const response = (
    await axiosInstance.get<ResponseSuccessListType<ProductType>>(url)
  ).data
  return response
}
export async function productGetByFlashSaleApi() {
  const url = `v1/product/get-flash-sale`
  const response = (
    await axiosInstance.get<ResponseSuccessListType<ProductType>>(url)
  ).data
  return response
}
export async function productGetByIdApi(id: string) {
  const url = `v1/product/get/${id}`
  const response = (
    await axiosInstance.get<ResponseSuccessType<ProductType>>(url)
  ).data
  return response
}
export async function productGetByIdSimilarApi(id: string, query?: string) {
  const url = `v1/product/get/${id}/similar?${query}`
  const response = (
    await axiosInstance.get<ResponseSuccessListType<ProductType>>(url)
  ).data
  return response
}
