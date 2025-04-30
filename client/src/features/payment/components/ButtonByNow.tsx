import { Button } from '@/components/ui/button'
import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePaymentStore } from '../stores/payment.store'
import { ProductType } from '@/features/product/types/product.type'

const ButtonByNow = ({
  product,
  quantity,
}: {
  product: ProductType
  quantity: number
}) => {
  const { addPayment } = usePaymentStore()
  const navigate = useNavigate()
  const handlePayment = useCallback(() => {
    const payments = [
      {
        quantity: quantity,
        product: product,
      },
    ]
    addPayment(payments)
    navigate(`/payment`)
  }, [product, quantity])
  return (
    <Button
      onClick={handlePayment}
      variant="destructive"
      className="block w-full"
    >
      By now
    </Button>
  )
}

export default memo(ButtonByNow)
