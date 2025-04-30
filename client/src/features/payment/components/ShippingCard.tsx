import { Button } from '@/components/ui/button'
import { AddressType } from '@/features/address/types/address.type'
import React, { memo } from 'react'
import { usePaymentStore } from '../stores/payment.store'
import { useNavigate } from 'react-router-dom'

const ShippingCard = ({ data }: { data: AddressType }) => {
  const { setShippingAddress } = usePaymentStore()
  const navigate = useNavigate()
  return (
    <>
      <div className="p-4 rounded-lg bg-boxColor space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h6>{data.fullName}</h6>
            {data.isDefault && (
              <span className="text-green-500">Default Address</span>
            )}
          </div>
          <p>
            <span className="text-textSecondaryColor">Address: </span>
            {data.address} {data.ward} {data.district} {data.province}
          </p>
          <p>
            <span className="text-textSecondaryColor">Phone: </span>
            {data.phoneNumber}
          </p>
        </div>
        <div>
          <Button
            onClick={() => {
              setShippingAddress(data)
              navigate('/payment')
            }}
            size={'sm'}
          >
            Deliver to this address
          </Button>
        </div>
      </div>
    </>
  )
}

export default memo(ShippingCard)
