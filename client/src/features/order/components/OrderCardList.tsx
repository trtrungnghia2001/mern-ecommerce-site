import NotFoundResultComponent from '@/components/NotFoundResultComponent'
import PaginateComponent from '@/components/common/paginate-component'
import { ComponentProps, FC, memo } from 'react'
import clsx from 'clsx'
import OrderCard from './OrderCard'
import OrderCardSkeleton from './OrderCardSkeleton'
import { OrderType } from '../types/order.type'

interface IOrderList extends ComponentProps<'div'> {
  datas: OrderType[]
  isLoading: boolean
  paginate: {
    current_page: number
    total_pages: number
    onChange: (value: number) => void
  }
}

const OrderCardList: FC<IOrderList> = ({
  datas,
  isLoading,
  paginate,
  ...props
}) => {
  if (isLoading)
    return (
      <div className="grid gap-4 grid-cols-1">
        {datas.map((item) => (
          <OrderCardSkeleton key={item._id} />
        ))}
      </div>
    )
  if (datas.length === 0) return <NotFoundResultComponent />
  return (
    <>
      <div
        className={clsx([`mb-6 grid gap-4 grid-cols-1`, props.className])}
        {...props}
      >
        {datas.map((item) => (
          <OrderCard key={item._id} data={item} />
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

export default memo(OrderCardList)
