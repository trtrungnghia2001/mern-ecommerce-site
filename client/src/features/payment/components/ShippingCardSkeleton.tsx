import React, { memo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const ShippingCardSkeleton = () => {
  return (
    <div className="bg-itemColor border rounded-lg p-4 space-y-2">
      <Skeleton className="h-2" />
      <Skeleton className="h-2" />
      <Skeleton className="h-2" />
    </div>
  )
}

export default memo(ShippingCardSkeleton)
