import { create } from 'zustand'
import { OrderType, OrderStoreType } from '../types/order.type'
import axiosInstance from '@/configs/axios.config'
import { ResponseSuccessListType, ResponseSuccessType } from '@/utils/type.util'

const baseUrl = `v1/order/`

export const useOrderStore = create<OrderStoreType>()((set, get) => ({
  orders: [],
  createOrder: async (data) => {
    const url = baseUrl + 'create'
    const response = (
      await axiosInstance.post<ResponseSuccessType<OrderType>>(url, data)
    ).data
    if (response.status === 200) {
      set({ orders: [response.data, ...get().orders] })
    }
    return response
  },
  updateOrderById: async (orderId, data) => {
    const url = baseUrl + `update/${orderId}`
    const response = (
      await axiosInstance.put<ResponseSuccessType<OrderType>>(url, data)
    ).data
    if (response.status === 200) {
      const updatedOrders = get().orders.map((order) =>
        order._id === orderId ? response.data : order,
      )
      set({ orders: updatedOrders })
    }
    return response
  },
  getOrderById: async (orderId) => {
    const url = baseUrl + `get/${orderId}`
    const response = (
      await axiosInstance.get<ResponseSuccessType<OrderType>>(url)
    ).data
    return response
  },
  getOrdersByMe: async (query = '') => {
    const url = baseUrl + 'get-me?' + query
    const response = (
      await axiosInstance.get<ResponseSuccessListType<OrderType>>(url)
    ).data
    set({ orders: response.data.results })
    return response
  },
}))
