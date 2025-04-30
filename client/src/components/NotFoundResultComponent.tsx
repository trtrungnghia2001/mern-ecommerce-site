import { IMAGE_NOTFOUND } from '@/constants/image.constant'
import React, { memo } from 'react'

const NotFoundResultComponent = () => {
  return (
    <div className="p-8 bg-white">
      <div className="max-w-48 w-full mx-auto">
        <img
          src={IMAGE_NOTFOUND.RESULT_EMPTY}
          alt={IMAGE_NOTFOUND.RESULT_EMPTY}
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default memo(NotFoundResultComponent)
