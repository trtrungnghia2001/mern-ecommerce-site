import clsx from 'clsx'
import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr'

interface QuantityInputProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

const QuantityInput: FC<QuantityInputProps> = ({
  value,
  onChange,
  className,
}) => {
  const [quantity, setQuantity] = useState(value)
  useEffect(() => {
    setQuantity(value)
  }, [value])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let qt = e.target.value.replace(/[^0-9]/, '')
    qt = qt == '' ? `1` : qt
    setQuantity(parseInt(qt))
  }
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(value)
  }
  const handleIncrement = () => {
    onChange(value + 1)
  }

  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1)
    }
  }
  return (
    <div className={clsx([`flex items-stretch gap-1`, className])}>
      <button className="border rounded px-2" onClick={handleDecrement}>
        <GrFormSubtract />
      </button>
      <input
        className="flex-1 border px-2 py-1 rounded max-w-10"
        type="text"
        value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button className="border rounded px-2" onClick={handleIncrement}>
        <GrFormAdd />
      </button>
    </div>
  )
}

export default memo(QuantityInput)
