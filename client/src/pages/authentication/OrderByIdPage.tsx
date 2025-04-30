import { Button } from '@/components/ui/button'
import { useOrderStore } from '@/features/order/stores/order.store'
import { displayCurrency } from '@/utils/currency.util'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { MdListAlt, MdLocationOn, MdOutlinePayment } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'

const OrderByIdPage = () => {
  const { getOrderById } = useOrderStore()
  const { id } = useParams()
  const getResult = useQuery({
    queryKey: [`me`, `order`, id],
    queryFn: async () => {
      return await getOrderById(id as string)
    },
    enabled: !!id,
  })
  const orderData = getResult.data?.data

  const { updateOrderById } = useOrderStore()
  const canceledOrderByIdResult = useMutation({
    mutationFn: async (id: string) =>
      await updateOrderById(id, {
        status: 'canceled',
      }),
    onSuccess: (data) => {
      toast.success(data.message)
      navigate(`/me/order-management`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const navigate = useNavigate()
  return (
    <div className="space-y-6">
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
        <div className="bg-boxColor p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MdListAlt size={18} />
            <h6>Order Code: {orderData?._id}</h6>
          </div>
          <p>
            <span>Order date: </span>
            {orderData?.createdAt &&
              new Date(orderData?.createdAt).toDateString()}
          </p>
          <p>
            <span>Status: </span>
            {orderData?.status}
          </p>
        </div>
        <div className="bg-boxColor p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MdLocationOn size={18} />
            <h6>Recipient address</h6>
          </div>
          <p>
            <span>Fullname: </span>
            {orderData?.shippingAddress.fullName}
          </p>
          <p>
            <span>Address: </span>
            {orderData?.shippingAddress.address},{' '}
            {orderData?.shippingAddress.ward},{' '}
            {orderData?.shippingAddress.district},{' '}
            {orderData?.shippingAddress.province}
          </p>
          <p>
            <span>Phone number: </span>
            {orderData?.shippingAddress.phoneNumber}
          </p>
        </div>
        <div className="bg-boxColor p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MdOutlinePayment size={18} />
            <h6>Payment method</h6>
          </div>
          {orderData?.paymentMethod === 'cash-payment' && <p>Cash payment</p>}
        </div>
      </div>
      <div className="bg-boxColor p-3 rounded-lg overflow-auto">
        <table className="w-full overflow-x-auto table-auto">
          <thead>
            <tr>
              <th className="w-full pb-4">Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.products.map((item) => (
              <tr key={item.product._id}>
                <td className="py-2">
                  <Link to={`/product/` + item.product._id}>
                    <div className="flex gap-3 items-start">
                      <div className="w-10 aspect-square rounded-lg">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width="50"
                        />
                      </div>
                      <div className="flex-1 min-w-40">{item.product.name}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-4">
                  <span className="font-medium text-red-500">
                    {displayCurrency(item.price)}
                  </span>{' '}
                  <span className="text-textSecondaryColor line-through text-12">
                    {displayCurrency(item.origin_price)}
                  </span>
                </td>
                <td className="px-4">{item.quantity}</td>
                <td className="px-4 font-medium text-green-500">
                  {displayCurrency(item.discount)}
                </td>
                <td className="px-4 font-medium text-red-500">
                  {displayCurrency(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-right border-t">
            <tr>
              <td className="pt-2 px-2" colSpan={4}>
                Total cost
              </td>
              <td className="px-2">{displayCurrency(orderData?.total_cost)}</td>
            </tr>
            <tr>
              <td className="px-2" colSpan={4}>
                Total discount
              </td>
              <td className="px-2">
                {displayCurrency(orderData?.direct_discount)}
              </td>
            </tr>
            <tr>
              <td className="px-2" colSpan={4}>
                Shipping fee
              </td>
              <td className="px-2">
                {displayCurrency(orderData?.shipping_fee)}
              </td>
            </tr>
            <tr>
              <td className="px-2" colSpan={4}>
                Shipping discount
              </td>
              <td className="px-2">
                {displayCurrency(orderData?.shipping_discount)}
              </td>
            </tr>

            <tr>
              <td className="px-2" colSpan={4}>
                Total payment
              </td>
              <td className="px-2">
                {displayCurrency(orderData?.total_payment)}
              </td>
            </tr>
            <tr>
              <td className="px-2" colSpan={4}>
                Total save
              </td>
              <td className="px-2">{displayCurrency(orderData?.total_save)}</td>
            </tr>
            {!['canceled', 'delivered'].includes(
              orderData?.status as string,
            ) && (
              <tr>
                <td colSpan={4}></td>
                <td className="py-2">
                  <Button
                    disabled={canceledOrderByIdResult.isPending}
                    onClick={() => canceledOrderByIdResult.mutate(id as string)}
                    size={'sm'}
                  >
                    Cancel order
                  </Button>
                </td>
              </tr>
            )}
            {/* {orderData?.status === 'delivered' && (
              <tr>
                <td colSpan={4}></td>
                <td className="py-2">
                  <Button size={'sm'}>Product reviews</Button>
                </td>
              </tr>
            )} */}
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default OrderByIdPage
