import React, { memo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const ProductCardSkeleton = () => {
  return (
    <div className="bg-itemColor border rounded-lg">
      <Skeleton className="aspect-square" />
      <div className="p-2 space-y-2">
        <Skeleton className="h-2" />
        <Skeleton className="h-2" />
        <Skeleton className="h-2" />
        <div className="pt-2 border-t text-10 text-gray-500">
          <Skeleton className="h-2" />
        </div>
      </div>
    </div>
  )
}

export default memo(ProductCardSkeleton)
