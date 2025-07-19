import { DataTable } from '@/components/DataTableComponent'
import { useProductStore } from '@/features/product/stores/product.store'
import { ProductType } from '@/features/product/types/product.type'
import { displayCurrency } from '@/utils/currency.util'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { Link } from 'react-router-dom'

const list = [
  {
    title: 'Total Sales',
    value: 3445600,
    type: 'currency',
  },
  {
    title: 'Total Order',
    value: 3456,
    type: '',
  },
  {
    title: 'Total Revenue',
    value: 3445600,
    type: 'currency',
  },
  {
    title: 'Total Customer',
    value: 42566,
    type: ' ',
  },
]

const DashboardPage = () => {
  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => {
        return (
          <Link to={`/product/` + row.original?._id}>
            <div className="flex items-center gap-2 py-1">
              <div className="w-10 aspect-square">
                <img
                  src={row.original.thumbnail}
                  alt={row.original.thumbnail}
                  loading="lazy"
                />
              </div>
              <div className="max-w-xs w-full">
                <h6 className="line-clamp-3">{row.original.name}</h6>
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
            {displayCurrency(row.original.price)}
          </h5>
          <p className="text-textSecondaryColor line-through text-xs">
            {displayCurrency(row.original.original_price)}
          </p>
        </div>
      ),
    },
    {
      id: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => <p>50</p>,
    },
    {
      id: 'amount',
      header: 'Amount',
      cell: ({ row }) => <p>{displayCurrency(row.original.original_price)}</p>,
    },
  ]
  const { getProducts, products } = useProductStore()
  const getResult = useQuery({
    queryKey: ['admin', 'products'],
    queryFn: async () => {
      return getProducts()
    },
  })
  return (
    <div className="space-y-8">
      <ul className="grid grid-cols-4 gap-4">
        {list.map((item, idx) => (
          <li key={idx} className="p-4 rounded-lg bg-boxColor shadow space-y-2">
            <p className="text-textSecondaryColor font-medium">{item.title}</p>
            <p className="text-xl font-semibold">
              {item.type === 'currency'
                ? displayCurrency(item.value)
                : item.value}
            </p>
            <p className="text-xs text-textSecondaryColor ">
              <span className="inline-block bg-green-100 text-green-500 px-2 rounded">
                14%
              </span>
              <span> in the last month</span>
            </p>
          </li>
        ))}
      </ul>

      <div className="flex items-stretch gap-4">
        <DataTable
          columns={columns}
          data={products.map((item) => ({ id: item._id, ...item }))}
        />
      </div>
    </div>
  )
}

export default DashboardPage
