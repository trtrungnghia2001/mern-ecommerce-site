import { create } from 'zustand'
import { CartStoreType, CartType } from '../types/cart.type'
import { ResponseSuccessListType, ResponseSuccessType } from '@/utils/type.util'
import axiosInstance from '@/configs/axios.config'

const baseUrl = `v1/cart/`

export const useCartStore = create<CartStoreType>()((set, get) => ({
  total_quantity: 0,
  carts: [],
  addCart: async (productId, quantity) => {
    const url = baseUrl + 'add'
    const response = await (
      await axiosInstance.post<ResponseSuccessType<CartType>>(url, {
        product: productId,
        quantity: quantity || 1,
      })
    ).data
    if (response.status === 201) {
      set({
        carts: [response.data, ...get().carts],
        total_quantity: get().total_quantity + quantity,
      })
    }
    if (response.status === 200) {
      set({
        carts: get().carts.map((cart) =>
          cart._id === productId ? response.data : cart,
        ),
        total_quantity: get().total_quantity + quantity,
      })
    }
    return response
  },
  updateCartById: async (cartId, data) => {
    const url = baseUrl + 'update/' + cartId
    const response = await (
      await axiosInstance.put<ResponseSuccessType<CartType>>(url, data)
    ).data
    if (response.status === 200) {
      set({
        carts: get().carts.map((cart) =>
          cart._id === cartId ? { ...cart, ...data } : cart,
        ),
      })
    }
    return response
  },
  removeCartById: async (cartId) => {
    const url = baseUrl + 'remove/' + cartId
    const response = await (
      await axiosInstance.delete<ResponseSuccessType<CartType>>(url)
    ).data
    if (response.status === 200) {
      set({
        carts: get().carts.filter((cart) => cart._id !== cartId),
        total_quantity: get().total_quantity - response.data.quantity,
      })
    }
    return response
  },
  removeCartSeclect: async (ids) => {
    const url = baseUrl + 'remove/select'
    const response = await (
      await axiosInstance.post<ResponseSuccessType<CartType>>(url, {
        ids: ids,
      })
    ).data
    if (response.status === 200) {
      const total_quantity_delete = get()
        .carts.filter((cart) => ids.includes(cart._id))
        .reduce((prev, curr) => {
          return prev + curr.quantity
        }, 0)
      set({
        carts: get().carts.filter((cart) => !ids.includes(cart._id)),
        total_quantity: get().total_quantity - total_quantity_delete,
      })
    }
    return response
  },
  getCart: async (query) => {
    const url = baseUrl + 'get' + (query ? `?${query}` : '')
    const response = await (
      await axiosInstance.get<ResponseSuccessListType<CartType>>(url)
    ).data
    set({
      carts: response.data.results,
      total_quantity: response.data.helper.total_quantity as number,
    })
    return response
  },
}))
