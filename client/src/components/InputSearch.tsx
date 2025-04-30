import clsx from 'clsx'
import React, { ComponentProps, FC, memo, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const InputSearch: FC<ComponentProps<'input'>> = ({ className, ...props }) => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  return (
    <div
      className={clsx([
        `flex items-center gap-2 border rounded-full pl-2`,
        className,
      ])}
    >
      <MdSearch size={24} />
      <input
        className="bg-transparent outline-none border-none py-1.5 pr-3 w-full"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            navigate(`/search?_q=${value}`, { replace: true })
          }
        }}
        {...props}
      />
    </div>
  )
}

export default memo(InputSearch)
