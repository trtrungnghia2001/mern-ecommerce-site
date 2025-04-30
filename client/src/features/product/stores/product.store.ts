import { create } from 'zustand'
import axiosInstance from '@/configs/axios.config'
import { ProductStoreType, ProductType } from '../types/product.type'
import { ResponseSuccessListType, ResponseSuccessType } from '@/utils/type.util'

const baseUrl = `v1/product/`

export const useProductStore = create<ProductStoreType>()((set, get) => ({
  // favorite
  product_favorites: [],
  addFavorite: async (productId) => {
    const url = baseUrl + 'favorite/add'
    const response = (
      await axiosInstance.post<ResponseSuccessType<ProductType>>(url, {
        product: productId,
      })
    ).data
    if (response.status === 201) {
      set({
        product_favorites: [response.data, ...get().product_favorites],
      })
    }
    return response
  },
  removeFavorite: async (productId) => {
    const url = baseUrl + 'favorite/remove/' + productId
    const response = (
      await axiosInstance.delete<ResponseSuccessType<ProductType>>(url)
    ).data
    if (response.status === 200) {
      set({
        product_favorites: get().product_favorites.filter(
          (item) => item._id !== productId,
        ),
      })
    }
    return response
  },
  getFavorite: async (query = '') => {
    const url = baseUrl + 'favorite/get?' + query
    const response = (
      await axiosInstance.get<ResponseSuccessListType<ProductType>>(url)
    ).data
    set({ product_favorites: response.data.results })
    return response
  },

  // history
  product_histories: [],
  addHistory: async (productId) => {
    const url = baseUrl + 'history/add'
    const response = (
      await axiosInstance.post<ResponseSuccessType<ProductType>>(url, {
        product: productId,
      })
    ).data
    if (response.status === 201) {
      set({
        product_histories: [response.data, ...get().product_histories],
      })
    }
    return response
  },
  removeHistory: async (productId) => {
    const url = baseUrl + 'history/remove/' + productId
    const response = (
      await axiosInstance.delete<ResponseSuccessType<ProductType>>(url)
    ).data
    if (response.status === 200) {
      set({
        product_histories: get().product_histories.filter(
          (item) => item._id !== productId,
        ),
      })
    }
    return response
  },
  getHistory: async (query = '') => {
    const url = baseUrl + 'history/get?' + query
    const response = (
      await axiosInstance.get<ResponseSuccessListType<ProductType>>(url)
    ).data
    set({ product_histories: response.data.results })
    return response
  },
}))
