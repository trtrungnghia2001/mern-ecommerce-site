import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { AuthStoreType } from '../types/auth.type'
import axiosInstance from '@/configs/axios.config'
import { ResponseSuccessType } from '@/utils/type.util'
import { UserType } from '../types/user.type'
import ENV_CONFIG from '@/configs/env.config'
import axios from 'axios'

const baseUrl = `auth/`

export const useAuthStore = create<AuthStoreType>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        access_token: '',
        isAuthenticated: false,

        signup: async (data) => {
          const url = baseUrl + `signup`
          const response = await (
            await axiosInstance.post<ResponseSuccessType>(url, data)
          ).data
          return response
        },
        signin: async (data) => {
          const url = baseUrl + `signin`
          const response = await (
            await axiosInstance.post<
              ResponseSuccessType<{
                user: UserType
                access_token: string
              }>
            >(url, data)
          ).data
          if (response.status === 200) {
            set({
              user: response.data.user,
              access_token: response.data.access_token,
              isAuthenticated: true,
            })
          }
          return response
        },
        signout: async () => {
          const url = baseUrl + `signout`
          const response = await (
            await axiosInstance.delete<ResponseSuccessType>(url)
          ).data
          set({ user: null, access_token: '', isAuthenticated: false })
          return response
        },
        forgotPassword: async (data) => {
          const url = baseUrl + `forgot-password`
          const response = await (
            await axiosInstance.post<ResponseSuccessType>(url, data)
          ).data
          return response
        },
        resetPassword: async (data) => {
          const url = baseUrl + `reset-password`
          const response = await (
            await axiosInstance.post<ResponseSuccessType>(url, data)
          ).data
          return response
        },

        signinWithPassport: async (social) => {
          const url = ENV_CONFIG.URL_SERVER + `passport/` + social
          window.open(url, '_self')
        },
        signinWithPasspostSuccess: async () => {
          const url = ENV_CONFIG.URL_SERVER + `passport/signin-passport/success`
          const response = await (
            await axios.get<
              ResponseSuccessType<{
                user: UserType
                access_token: string
              }>
            >(url, {
              withCredentials: true,
            })
          ).data
          if (response.status === 200) {
            set({
              user: response.data.user,
              access_token: response.data.access_token,
              isAuthenticated: true,
            })
          }
          return response
        },

        getMe: async () => {
          const url = baseUrl + `get-me`
          const response = await (
            await axiosInstance.get<ResponseSuccessType<UserType>>(url)
          ).data
          return response
        },
        updataMe: async (data) => {
          const url = baseUrl + `update-me`
          const response = await (
            await axiosInstance.put<ResponseSuccessType<UserType>>(url, data)
          ).data
          if (response.status === 200) {
            set({ user: response.data })
          }
          return response
        },
        changePassword: async (data) => {
          const url = baseUrl + `change-password`
          const response = await (
            await axiosInstance.put<ResponseSuccessType>(url, data)
          ).data
          return response
        },
      }),
      {
        name: 'auth',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
)
