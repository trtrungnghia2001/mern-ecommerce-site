import clsx from 'clsx'
import React, { ComponentProps, FC } from 'react'

const WrapperComponent: FC<ComponentProps<'div'>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx([`max-w-[1360px] w-full mx-auto`, className])}
      {...props}
    >
      {children}
    </div>
  )
}

export default WrapperComponent
