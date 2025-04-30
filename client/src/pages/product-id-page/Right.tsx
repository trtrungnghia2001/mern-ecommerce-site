import QuantityInput from '@/components/QuantityInput'
import ButtonAddToCart from '@/features/cart/components/ButtonAddToCart'
import ButtonByNow from '@/features/payment/components/ButtonByNow'
import { ProductType } from '@/features/product/types/product.type'
import { displayCurrency } from '@/utils/currency.util'
import React, { memo, useState } from 'react'

const Right = ({ data }: { data: ProductType }) => {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="hidden xl:block bg-boxColor p-4 rounded-lg max-w-[360px] w-full space-y-4">
      {/* info */}
      <div className="flex items-start gap-2">
        <div className="w-10">
          <img src={data?.thumbnail} alt={data?.thumbnail} loading="lazy" />
        </div>
        <h6 className="flex-1">{data?.name}</h6>
      </div>
      {/* quantity input */}
      <div>
        <h5 className="mb-2">Quantity</h5>
        <QuantityInput value={quantity} onChange={setQuantity} />
      </div>
      {/* total price */}
      <div>
        <h5 className="mb-2">Total price</h5>
        <h2 className="text-red-500">
          {displayCurrency(quantity * data?.price)}
        </h2>
      </div>
      {/* buttons */}
      <div className="space-y-2">
        <ButtonByNow product={data as ProductType} quantity={1} />
        <ButtonAddToCart productId={data?._id} quantity={quantity} />
      </div>
    </div>
  )
}

export default memo(Right)
