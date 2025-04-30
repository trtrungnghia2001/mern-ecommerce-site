import { create } from 'zustand'
import { AddressStoreType, AddressType } from '../types/address.type'
import axiosInstance from '@/configs/axios.config'
import { ResponseSuccessListType, ResponseSuccessType } from '@/utils/type.util'
import { usePaymentStore } from '@/features/payment/stores/payment.store'

const baseUrl = `v1/address/`

export const useAddressStore = create<AddressStoreType>()((set, get) => ({
  addresses: [],
  createAddress: async (data) => {
    const url = baseUrl + `create`
    const response = (
      await axiosInstance.post<ResponseSuccessType<AddressType>>(url, data)
    ).data
    if (response.status === 201) {
      set({ addresses: [response.data, ...get().addresses] })
    }
    return response
  },
  updateAddressById: async (id, data) => {
    const url = baseUrl + `update/${id}`
    const response = (
      await axiosInstance.put<ResponseSuccessType<AddressType>>(url, data)
    ).data
    if (response.status === 200) {
      set({
        addresses: get().addresses.map((address) =>
          address._id === id ? { ...address, ...data } : address,
        ),
      })
    }
    return response
  },
  deleteAddressById: async (id) => {
    const url = baseUrl + `delete/${id}`
    const response = (
      await axiosInstance.delete<ResponseSuccessType<AddressType>>(url)
    ).data
    if (response.status === 200) {
      set({
        addresses: get().addresses.filter((address) => address._id !== id),
      })
    }
    return response
  },
  getAddressesByMe: async (query) => {
    const url = baseUrl + `get-me?` + (query || '')
    const response = (
      await axiosInstance.get<ResponseSuccessListType<AddressType>>(url)
    ).data
    set({ addresses: response.data.results })
    return response
  },
  getAddressById: async (id) => {
    const url = baseUrl + `get/${id}`
    const response = (
      await axiosInstance.get<ResponseSuccessType<AddressType>>(url)
    ).data
    set({ addresses: [response.data] })
    return response
  },
  getAddressByDefault: async () => {
    const url = baseUrl + `get-default-address`
    const response = (
      await axiosInstance.get<ResponseSuccessType<AddressType>>(url)
    ).data
    usePaymentStore.getState().setShippingAddress(response.data)
    return response
  },
}))
