import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { ProductType } from '../types/product.type'
import { displayCurrency } from '@/utils/currency.util'
import ProductCardAction from './ProductCardAction'
import RatingComponent from '@/components/RatingComponent'

const ProductCard = ({ data }: { data: ProductType }) => {
  return (
    <div className="relative group">
      {/* product details */}
      <Link to={`/product/` + data?._id}>
        <div className="border rounded-lg hover:shadow-lg overflow-hidden bg-itemColor">
          <div className="aspect-square">
            <img src={data?.thumbnail} alt={data?.thumbnail} loading="lazy" />
          </div>
          <div className="p-2 space-y-2">
            <div className="line-clamp-2 h-8 text-xs">{data?.name}</div>
            <RatingComponent value={data.rating_average} />

            <h4 className="text-red-500">{displayCurrency(data?.price)}</h4>
            <div className="space-x-2">
              <span className="text-xs inline-block px-1 py-0.5 rounded font-semibold bg-gray-100">
                -{data?.discount_rate}%
              </span>
              <span className="text-10 line-through inline-block px-1 py-0.5 rounded text-gray-500 bg-gray-100">
                {displayCurrency(data?.original_price)}
              </span>
            </div>
            <div className="pt-2 border-t text-10 text-gray-500">
              {data.origin ?? `Delivery tomorrow`}
            </div>
          </div>
        </div>
      </Link>
      {/* actions */}
      <ProductCardAction data={data} />
    </div>
  )
}

export default memo(ProductCard)
