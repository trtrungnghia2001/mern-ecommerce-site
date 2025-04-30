import PaginateComponent from '@/components/common/paginate-component'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { getNotificationsApi } from '@/services/notifi.service'
import { displayCurrency } from '@/utils/currency.util'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'

const NotificationPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const getNotificationsApiResult = useQuery({
    queryKey: [`me`, 'notifications'],
    queryFn: async () => {
      return await getNotificationsApi(searchParams.toString())
    },
  })
  return (
    <div className="space-y-4">
      {getNotificationsApiResult.isLoading && <div>Loading...</div>}
      {getNotificationsApiResult.data?.data.results.length === 0 && (
        <p className="text-center text-textSecondaryColor">
          No notifications found.
        </p>
      )}
      {getNotificationsApiResult.data?.data.results.map((item) => {
        const data = item.order
        return (
          <div key={item._id} className="bg-boxColor p-3 rounded-lg">
            <div className="border-b pb-2 mb-2">
              <h6>{item.title}</h6>
              <p>{item.message}</p>
            </div>
            <Link to={`/me/order/` + data._id}>
              {data.products.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-8 items-start justify-between py-3 border-b first:pt-0"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-12 aspect-square rounded-lg p-0.5 border">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.thumbnail}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1">
                      <h6>{item.product.name}</h6>
                      <p className="text-textSecondaryColor">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-red-500 text-14">
                    {displayCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </Link>
            <div className="flex justify-end pt-3">
              <h5>
                <span>Total amount: </span>
                <span className="text-red-500 text-14">
                  {displayCurrency(data.total_payment)}
                </span>
              </h5>
            </div>
          </div>
        )
      })}
      {getNotificationsApiResult.data && (
        <PaginateComponent
          forcePage={getNotificationsApiResult.data?.data.paginations.page - 1}
          pageCount={
            getNotificationsApiResult.data?.data.paginations.total_pages
          }
          onPageChange={(e) => {
            handleSearchParams(`_page`, (e.selected + 1).toString())
          }}
        />
      )}
    </div>
  )
}

export default NotificationPage
