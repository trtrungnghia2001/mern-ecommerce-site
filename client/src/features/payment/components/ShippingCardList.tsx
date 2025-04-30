import NotFoundResultComponent from '@/components/NotFoundResultComponent'
import PaginateComponent from '@/components/common/paginate-component'
import { ComponentProps, FC, memo } from 'react'
import clsx from 'clsx'
import ShippingCard from './ShippingCard'
import { AddressType } from '@/features/address/types/address.type'
import ShippingCardSkeleton from './ShippingCardSkeleton'

interface IAddressList extends ComponentProps<'div'> {
  datas: AddressType[]
  isLoading: boolean
  paginate: {
    current_page: number
    total_pages: number
    onChange: (value: number) => void
  }
}

const ShippingCardList: FC<IAddressList> = ({
  datas,
  isLoading,
  paginate,
  ...props
}) => {
  if (isLoading)
    return (
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
        {datas.map((item) => (
          <ShippingCardSkeleton key={item._id} />
        ))}
      </div>
    )
  if (datas.length === 0) return <NotFoundResultComponent />
  return (
    <>
      <div
        className={clsx([
          `mb-6 grid gap-2 grid-cols-1 sm:grid-cols-2`,
          props.className,
        ])}
        {...props}
      >
        {datas.map((item) => (
          <ShippingCard key={item._id} data={item} />
        ))}
      </div>
      <PaginateComponent
        forcePage={paginate.current_page - 1}
        pageCount={paginate.total_pages}
        onPageChange={(e) => {
          paginate.onChange(e.selected + 1)
        }}
      />
    </>
  )
}

export default memo(ShippingCardList)
