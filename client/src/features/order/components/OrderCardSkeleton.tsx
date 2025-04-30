import React, { memo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const OrderCardSkeleton = () => {
  return (
    <div className="p-3 rounded-lg bg-boxColor flex gap-8 items-start justify-between">
      <div className="flex items-start gap-3 w-full">
        <Skeleton className="w-12 aspect-square rounded-lg" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-2" />
          <Skeleton className="h-2" />
        </div>
        <Skeleton className="h-2 w-12" />
      </div>
    </div>
  )
}

export default memo(OrderCardSkeleton)
