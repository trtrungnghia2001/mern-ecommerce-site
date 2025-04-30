import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { PaymentSotreType } from '../types/payment.type'

export const usePaymentStore = create<PaymentSotreType>()(
  devtools(
    persist(
      (set) => ({
        payments: [],
        addPayment: (payments) => {
          set({
            payments: payments,
          })
        },
        removePayment: () => {
          set({
            payments: [],
          })
        },
        shippingAddress: null,
        setShippingAddress: (address) => {
          set({
            shippingAddress: address,
          })
        },
      }),
      {
        name: 'PaymentStore',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
)
