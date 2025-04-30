import OrderCardList from '@/features/order/components/OrderCardList'
import { useOrderStore } from '@/features/order/stores/order.store'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'

const filter = [
  {
    label: 'All orders',
    value: '',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Processing',
    value: 'processing',
  },
  {
    label: 'Shipped',
    value: 'shipped',
  },
  {
    label: 'Delivered',
    value: 'delivered',
  },
  {
    label: 'Canceled',
    value: 'canceled',
  },
]

const OrderManagementPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const { orders, getOrdersByMe } = useOrderStore()
  const getResult = useQuery({
    queryKey: ['me', 'order', searchParams.toString()],
    queryFn: async () => {
      return getOrdersByMe(searchParams.toString())
    },
  })
  return (
    <div>
      <div className="overflow-x-auto bg-boxColor mb-4">
        <div className="flex items-stretch">
          {filter.map((item, idx) => (
            <div
              key={item.label}
              onClick={() => handleSearchParams('_status', item.value)}
              className={clsx([
                `py-3 px-6 cursor-pointer min-w-max w-full text-center`,
                searchParams.get('_status') === item.value &&
                  'text-blue-500 border-b-2 border-b-blue-500',

                searchParams.get('_status') === null &&
                  idx === 0 &&
                  'text-blue-500 border-b-2 border-b-blue-500',
              ])}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <OrderCardList
        datas={orders}
        isLoading={getResult.isLoading}
        paginate={{
          current_page: getResult.data?.data.paginations.page || 1,
          total_pages: getResult.data?.data.paginations.total_pages || 1,
          onChange: (e) => handleSearchParams('_page', e as unknown as string),
        }}
      />
    </div>
  )
}

export default OrderManagementPage
