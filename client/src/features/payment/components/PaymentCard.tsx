import React, { memo } from 'react'
import { PaymentType } from '../types/payment.type'
import { displayCurrency } from '@/utils/currency.util'

const PaymentCard = ({ data }: { data: PaymentType }) => {
  return (
    <div className="border rounded-lg p-3 flex items-center gap-4">
      <div className="w-12 aspect-square">
        <img
          src={data.product.thumbnail}
          alt={data.product.thumbnail}
          loading="lazy"
        />
      </div>
      <div className="flex-1">
        <h6>{data.product.name}</h6>
        <p>
          <span>Quantity: </span>
          {data.quantity}
        </p>
        <p className="text-14 space-x-4">
          <span className="text-textSecondaryColor line-through">
            {displayCurrency(data.product.discount * data.quantity)}
          </span>
          <span className="text-red-500">
            {displayCurrency(data.product.price * data.quantity)}
          </span>
        </p>
      </div>
    </div>
  )
}

export default memo(PaymentCard)
