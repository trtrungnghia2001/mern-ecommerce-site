import clsx from 'clsx'
import React, { memo } from 'react'
import { FaStar } from 'react-icons/fa'

const RatingComponent = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({
        length: 5,
      }).map((_, idx) => (
        <FaStar
          key={idx}
          size={12}
          className={clsx([
            `text-gray-300`,
            idx < Math.floor(value) && `text-yellow-400`,
          ])}
        />
      ))}
    </div>
  )
}

export default memo(RatingComponent)
