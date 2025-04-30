import React from 'react'
import { OrderType } from '../types/order.type'
import { displayCurrency } from '@/utils/currency.util'
import { Link } from 'react-router-dom'
import { MdOutlineCancel } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import ENV_CONFIG from '@/configs/env.config'
import axiosInstance from '@/configs/axios.config'
import { ResponseSuccessType } from '@/utils/type.util'
import toast from 'react-hot-toast'

const OrderCard = ({ data }: { data: OrderType }) => {
  const sendNotification = useMutation({
    mutationFn: async () => {
      const url = ENV_CONFIG.URL_SERVER + `v1/order/update/` + data._id
      const response = await axiosInstance.put<ResponseSuccessType<OrderType>>(
        url,
        {
          status: 'delivered',
        },
      )
      return response.data
    },
    onSuccess: () => {
      toast.success(`Notification sent successfully`)
    },
    onError: (err) => {
      toast.error(`Failed to send notification: ${err.message}`)
    },
  })
  return (
    <div className="bg-boxColor p-3 rounded-lg">
      {data?.status === 'canceled' && (
        <div className="text-textSecondaryColor pb-2 border-b mb-2 font-medium flex items-center gap-2">
          <MdOutlineCancel size={18} />
          Order canceled
        </div>
      )}
      <Link to={`/me/order/` + data._id}>
        {data.products.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-8 items-start justify-between py-3 border-b first:pt-0"
          >
            <div className="flex items-start gap-2">
              <div className="w-12 aspect-square rounded-lg p-0.5 border">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.thumbnail}
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h6>{item.product.name}</h6>
                <p className="text-textSecondaryColor">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <p className="text-red-500 text-14">
              {displayCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </Link>
      <div className="flex justify-end pt-3">
        <h5>
          <span>Total amount: </span>
          <span className="text-red-500 text-14">
            {displayCurrency(data.total_payment)}
          </span>
        </h5>
      </div>
      {/* actions */}
      {/* <div>
          <Button onClick={() => sendNotification.mutate()} size={'sm'}>
            Send Notifi
          </Button>
        </div> */}
    </div>
  )
}

export default OrderCard
