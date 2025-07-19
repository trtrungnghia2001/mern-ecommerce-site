import PaginateComponent from '@/components/common/paginate-component'
import { DataTable } from '@/components/DataTableComponent'
import { useProductStore } from '@/features/product/stores/product.store'
import { ProductType } from '@/features/product/types/product.type'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { displayCurrency } from '@/utils/currency.util'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'

const AdminCustomerPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const { getProducts, products } = useProductStore()
  const getResult = useQuery({
    queryKey: ['me', 'products', searchParams.toString()],
    queryFn: async () => {
      return getProducts(searchParams.toString())
    },
  })
  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => {
        return (
          <Link to={`/product/` + row.original?._id}>
            <div className="flex items-center gap-2 py-1">
              <div className="w-16 aspect-square">
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
          <p className="text-textSecondaryColor line-through">
            {displayCurrency(row.original.original_price)}
          </p>
        </div>
      ),
    },
    {
      id: 'origin',
      header: 'Origin',
      cell: ({ row }) => row.original.origin,
    },
    {
      id: 'categories',
      header: 'Categories',
      cell: ({ row }) => row.original.categories,
    },
    {
      id: 'brand',
      header: 'Brand',
      cell: ({ row }) => row.original.brand,
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => (row.original.status ? 'Active' : 'Inactive'),
    },
    {
      id: 'delete',
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className="btn btn-sm btn-gray-500"
            // disabled={selectRow.length > 0}
            // onClick={() => removeCartByIdResult.mutate(row.original._id)}
          >
            <MdEdit size={20} color="blue" />
          </button>
          <button
            className="btn btn-sm btn-gray-500"
            // disabled={selectRow.length > 0}
            // onClick={() => removeCartByIdResult.mutate(row.original._id)}
          >
            <MdDelete size={20} color="red" />
          </button>
        </div>
      ),
    },
  ]
  return (
    <div>
      <div className="w-full overflow-y-auto">
        <div className="mb-4">
          <DataTable
            columns={columns}
            data={products.map((item) => ({ id: item._id, ...item }))}
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
    </div>
  )
}

export default AdminCustomerPage
