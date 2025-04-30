import PaymentCard from '@/features/payment/components/PaymentCard'
import { usePaymentStore } from '@/features/payment/stores/payment.store'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useMemo, useState } from 'react'
import { displayCurrency } from '@/utils/currency.util'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useAddressStore } from '@/features/address/stores/address.store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useOrderStore } from '@/features/order/stores/order.store'
import toast from 'react-hot-toast'
import { OrderType } from '@/features/order/types/order.type'
import { Loader2 } from 'lucide-react'
import LoaderComponent from '@/components/common/loader-component'
import { Textarea } from '@/components/ui/textarea'

const PaymentPage = () => {
  const { payments, shippingAddress } = usePaymentStore()
  const { getAddressByDefault } = useAddressStore()

  const getAddressByDefaultResult = useQuery({
    queryKey: ['address', 'get', 'default'],
    queryFn: async () => {
      return await getAddressByDefault()
    },
    enabled: !shippingAddress,
  })

  const orderData = useMemo(() => {
    return {
      details: [
        {
          label: `Total cost of goods`,
          value: payments.reduce((prev, curr) => {
            return prev + curr.quantity * curr.product.original_price
          }, 0),
        },
        {
          label: `Shipping fee`,
          value: 100000,
        },
        {
          label: `Direct discount`,
          value: payments.reduce((prev, curr) => {
            return prev + curr.quantity * curr.product.discount
          }, 0),
        },
        {
          label: `Shipping Discount`,
          value: 100000,
        },
      ],
      total_payment: function () {
        return (
          this.details?.[0]?.value +
          this.details?.[1]?.value -
          this.details?.[2]?.value -
          this.details?.[3]?.value
        )
      },
      total_save: function () {
        return this.details?.[2]?.value + this.details?.[3]?.value
      },
    }
  }, [payments])

  const [selectPayment, setSelectPayment] = useState('cash-payment')

  const navigate = useNavigate()
  const { removePayment } = usePaymentStore()
  const { createOrder } = useOrderStore()
  const createOrderResult = useMutation({
    mutationFn: async (values: Partial<OrderType>) => {
      return await createOrder(values)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      navigate(`/me/order-management`)
      removePayment()
    },
    onError: (errorInfo) => {
      toast.error(errorInfo.message)
      console.log('Failed:', errorInfo)
    },
  })
  const handleOrder = () => {
    if (payments.length === 0) {
      toast.error('Please select at least one product')
      return
    }
    if (!shippingAddress) {
      toast.error('Please select shipping address')
      return
    }
    const value = {
      products: payments.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        origin_price: item.product.original_price,
        price: item.product.price,
        discount: item.product.discount,
      })),
      total_cost: orderData.details?.[0]?.value,
      shipping_fee: orderData.details?.[1]?.value,
      direct_discount: orderData.details?.[2]?.value,
      shipping_discount: orderData.details?.[3]?.value,
      total_payment: orderData.total_payment(),
      total_save: orderData.total_save(),
      shippingAddress: shippingAddress,
      paymentMethod: selectPayment,
      note: note,
    }
    createOrderResult.mutate(value as unknown as OrderType)
  }

  const [note, setNote] = useState('')

  return (
    <>
      {getAddressByDefaultResult.isLoading && <LoaderComponent />}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* left */}
        <div className="flex-1 w-full space-y-6">
          {/* products */}
          <div className="bg-boxColor p-4 rounded-lg">
            <h5 className="mb-2">Products</h5>
            <div className="space-y-4">
              {payments.map((payment, idx) => (
                <PaymentCard key={idx} data={payment} />
              ))}
            </div>
          </div>
          {/* Payment form */}
          <div className="bg-boxColor p-4 rounded-lg">
            <h5 className="mb-2">Select payment method</h5>
            <RadioGroup
              value={selectPayment}
              onValueChange={(e) => {
                setSelectPayment(e)
              }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash-payment" id="cash-payment" />
                <Label htmlFor="cash-payment">Cash payment</Label>
              </div>
              {/* <div className="flex items-center space-x-2">
                <RadioGroupItem value="momo-payment" id="momo-payment" />
                <Label htmlFor="momo-payment">Momo payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal-payment" id="paypal-payment" />
                <Label htmlFor="paypal-payment">Paypal payment</Label>
              </div> */}
            </RadioGroup>
          </div>
          {/* note */}
          <div className="bg-boxColor p-4 rounded-lg">
            <h5 className="mb-2">Note</h5>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>
        {/* right */}
        <div className="md:max-w-xs w-full space-y-6">
          {/* address */}
          <div className="bg-boxColor p-4 rounded-lg space-y-3">
            <h5 className="mb-2">Delivered to</h5>
            <h6 className="leading-none">
              <span className="pr-2 mr-2 border-r ">
                {shippingAddress?.fullName}
              </span>
              <span>{shippingAddress?.phoneNumber}</span>
            </h6>
            <div className="text-textSecondaryColor">
              {shippingAddress?.address} {shippingAddress?.ward}{' '}
              {shippingAddress?.district} {shippingAddress?.province}
            </div>

            <div>
              <Link to={`/shipping`}>
                <Button className="w-full">Change delivered</Button>
              </Link>
            </div>
          </div>
          {/* order */}
          <div className="bg-boxColor p-4 rounded-lg space-y-3">
            <h5 className="mb-2">Order</h5>
            <ul className="space-y-2">
              {orderData.details.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-textSecondaryColor">{item.label}</span>
                  <span>{displayCurrency(item.value)}</span>
                </li>
              ))}
            </ul>
            <hr />
            <div className="flex items-start justify-between">
              <span>Total payment</span>
              <div className="text-right">
                <div className="text-base font-medium text-red-500">
                  {displayCurrency(orderData.total_payment())}
                </div>
                <div className="font-medium text-green-500">
                  Save {displayCurrency(orderData.total_save())}
                </div>
              </div>
            </div>
            <div className="text-textSecondaryColor text-xs">
              (This price includes VAT, packaging, shipping and other incidental
              charges)
            </div>
            <Button
              disabled={createOrderResult.isPending}
              onClick={handleOrder}
              className="w-full"
              variant={'destructive'}
            >
              {createOrderResult.isPending && (
                <Loader2 className="animate-spin" />
              )}
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentPage
