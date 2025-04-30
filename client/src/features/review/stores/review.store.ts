import { create } from 'zustand'
import { ReviewStoreType, ReviewType } from '../types/review.type'
import axiosInstance from '@/configs/axios.config'
import { ResponseSuccessListType, ResponseSuccessType } from '@/utils/type.util'
import { useAuthStore } from '@/features/authentication/stores/auth.store'

const baseUrl = `review/`

export const useReviewStore = create<ReviewStoreType>()((set, get) => ({
  reviews: [],
  createReview: async (data) => {
    const url = baseUrl + 'create'
    const response = (
      await axiosInstance.post<ResponseSuccessType<ReviewType>>(url, data)
    ).data
    if (response.status === 201) {
      set({ reviews: [response.data, ...get().reviews] })
    }
    return response
  },
  getReviewByProductId: async (productId) => {
    const url = baseUrl + `get-product/${productId}`
    const response = (
      await axiosInstance.get<ResponseSuccessListType<ReviewType>>(url)
    ).data
    set({ reviews: response.data.results })
    return response
  },
}))

const reviewData = [
  {
    _id: '1',
    product: { _id: '1', name: 'Product 1' },
    user: useAuthStore.getState().user,
    content: 'Review 1',
    rating: 5,
    replies: [],
  },
]
