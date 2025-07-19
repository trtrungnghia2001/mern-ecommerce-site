import { useCartStore } from '@/features/cart/stores/cart.store'
import { CartType } from '@/features/cart/types/cart.type'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { displayCurrency } from '@/utils/currency.util'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import QuantityInput from '@/components/QuantityInput'

import toast from 'react-hot-toast'
import { MdDelete } from 'react-icons/md'
import LoaderComponent from '@/components/common/loader-component'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { usePaymentStore } from '@/features/payment/stores/payment.store'
import { DataTable } from '@/components/DataTableComponent'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import PaginateComponent from '@/components/common/paginate-component'

const CartPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const { getCart, removeCartById, updateCartById, carts } = useCartStore()
  const getResult = useQuery({
    queryKey: ['me', 'cart', searchParams.toString()],
    queryFn: async () => {
      return getCart(searchParams.toString())
    },
  })
  const removeCartByIdResult = useMutation({
    mutationFn: async (id: string) => await removeCartById(id),
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  //
  const [selectRow, setSelectRow] = useState<CartType[]>([])
  const [selectRowData, setSelectRowData] = useState<CartType[]>([])

  const priceData = useMemo(() => {
    const total_discount = selectRowData.reduce(
      (previousValue, currentValue) => {
        return (
          previousValue + currentValue.quantity * currentValue.product.discount
        )
      },
      0,
    )
    const total_price = selectRowData.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity * currentValue.product.price
    }, 0)
    const total_origin_price = selectRowData.reduce(
      (previousValue, currentValue) => {
        return (
          previousValue +
          currentValue.quantity * currentValue.product.original_price
        )
      },
      0,
    )
    const total_quantity = selectRowData.reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue.quantity
      },
      0,
    )
    return {
      total_discount,
      total_price,
      total_origin_price,
      total_quantity,
    }
  }, [selectRowData])

  const { addPayment } = usePaymentStore()

  const navigate = useNavigate()
  const handlePayment = useCallback(() => {
    const payments = selectRowData.map((item) => ({
      quantity: item.quantity,
      product: item.product,
    }))
    addPayment(payments)
    navigate(`/payment`)
  }, [selectRowData])

  const columns: ColumnDef<CartType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => {
        return (
          <Link to={`/product/` + row.original.product?._id}>
            <div className="flex items-center gap-2 py-1">
              <div className="w-16 aspect-square">
                <img
                  src={row.original.product.thumbnail}
                  alt={row.original.product.thumbnail}
                  loading="lazy"
                />
              </div>
              <div className="max-w-xs w-full">
                <h6 className="line-clamp-3">{row.original.product.name}</h6>
              </div>
            </div>
          </Link>
        )
      },
    },
    {
      id: 'price',
      header: 'Price',
      cell: ({ row }) => (
        <div>
          <h5 className="text-red-500">
            {displayCurrency(row.original.product.price)}
          </h5>
          <p className="text-textSecondaryColor line-through">
            {displayCurrency(row.original.product.original_price)}
          </p>
        </div>
      ),
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => {
        return (
          <QuantityInput
            value={row.original.quantity}
            onChange={(e) => updateCartById(row.original._id, { quantity: e })}
          />
        )
      },
    },
    {
      id: 'total-amount',
      header: 'Total amount',
      cell: ({ row }) => (
        <h5 className="text-red-500">
          {displayCurrency(row.original.quantity * row.original.product.price)}
        </h5>
      ),
    },
    {
      id: 'delete',
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <Button
            variant={'ghost'}
            className="btn btn-sm btn-gray-500"
            disabled={selectRow.length > 0}
            onClick={() => removeCartByIdResult.mutate(row.original._id)}
          >
            <MdDelete size={20} />
          </Button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    const datas = carts.filter((item) =>
      selectRow.find((subItem) => subItem._id === item._id),
    )
    setSelectRowData(datas)
  }, [carts, selectRow])

  return (
    <>
      {getResult.isLoading && <LoaderComponent />}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* list */}
        <div className="w-full overflow-y-auto">
          <div className="mb-4">
            <DataTable
              columns={columns}
              data={carts.map((item) => ({ id: item._id, ...item }))}
              onSelectValue={(value) => {
                setSelectRow(value)
              }}
            />
          </div>
          {getResult.data && (
            <PaginateComponent
              forcePage={getResult.data?.data.paginations.page - 1}
              pageCount={getResult.data?.data.paginations.total_pages}
              onPageChange={(e) => {
                handleSearchParams(`_page`, (e.selected + 1).toString())
              }}
            />
          )}
        </div>
        {/* checkout */}
        {carts.length > 0 && (
          <div className="md:max-w-xs w-full p-4 rounded-lg bg-boxColor space-y-4">
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-textSecondaryColor">Total cost</span>
                <span>{displayCurrency(priceData.total_origin_price)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-textSecondaryColor">Total discount</span>
                <span className="text-green-500">
                  -{displayCurrency(priceData.total_discount)}
                </span>
              </li>
              <hr />
              <li className="flex items-start justify-between">
                <span className="font-medium">Total payment</span>
                <div className="text-right space-y-1">
                  <p className="text-red-500 font-medium text-base">
                    {displayCurrency(priceData.total_price)}
                  </p>
                  <p className="text-xs text-textSecondaryColor">
                    (VAT included if applicable)
                  </p>
                </div>
              </li>
            </ul>
            <Button
              disabled={selectRow.length > 0 ? false : true}
              onClick={handlePayment}
              className="w-full"
            >
              Shopping ({priceData.total_quantity})
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartPage
