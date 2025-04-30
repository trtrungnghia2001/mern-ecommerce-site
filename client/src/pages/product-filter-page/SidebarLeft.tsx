import {
  getBrandApi,
  getCategoryApi,
  getOriginApi,
} from '@/services/common.service'
import { useQuery } from '@tanstack/react-query'
import RatingComponent from '@/components/RatingComponent'
import { RiSubtractFill } from 'react-icons/ri'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

const SidebarLeft = ({
  searchParams,
  handleSearchParams,
}: {
  searchParams: URLSearchParams
  handleSearchParams: (name: string, value: string) => void
}) => {
  const getBrandResult = useQuery({
    queryKey: ['brand', 'get'],
    queryFn: async () => {
      return await getBrandApi()
    },
  })
  const getOriginResult = useQuery({
    queryKey: ['origin', 'get'],
    queryFn: async () => {
      return await getOriginApi()
    },
  })
  const getCategoryResult = useQuery({
    queryKey: ['category', 'get'],
    queryFn: async () => {
      return await getCategoryApi()
    },
  })
  const ratin = [
    {
      label: '5.0',
      value: 5,
    },
    {
      label: '4.0',
      value: 4,
    },
    {
      label: '3.0',
      value: 3,
    },
    {
      label: '2.0',
      value: 2,
    },
    {
      label: '1.0',
      value: 1,
    },
  ]

  const [price_min, setPrice_min] = useState(0)
  const [price_max, setPrice_max] = useState(0)

  return (
    <div className="space-y-5">
      {/* category */}
      <div className="space-y-2">
        <h6>Category</h6>
        <ul className="space-y-1 max-h-60 overflow-y-auto scrollbar">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="category-all"
              name="category"
              value={''}
              onClick={() => {
                handleSearchParams('_category', '')
                handleSearchParams(`_page`, String(1))
              }}
              defaultChecked
            />
            <label htmlFor="category-all">All</label>
          </div>
          {getCategoryResult.data?.data.map((item) => (
            <li key={item}>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={item}
                  name="category"
                  value={item}
                  onClick={() => {
                    handleSearchParams('_category', item)
                    handleSearchParams(`_page`, String(1))
                  }}
                  defaultChecked={
                    searchParams.get('_category') === item ? true : false
                  }
                />
                <label htmlFor={item}>{item}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* origin */}
      <div className="space-y-2">
        <h6>Seller</h6>
        <ul className="space-y-1 max-h-60 overflow-y-auto scrollbar">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="origin-all"
              name="origin"
              value={''}
              defaultChecked
              onClick={() => {
                handleSearchParams('_origin', '')
                handleSearchParams(`_page`, String(1))
              }}
            />
            <label htmlFor="origin-all">All</label>
          </div>
          {getOriginResult.data?.data.map((item) => (
            <li key={item}>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={item}
                  name="origin"
                  value={item}
                  onClick={() => {
                    handleSearchParams('_origin', item)
                    handleSearchParams(`_page`, String(1))
                  }}
                  defaultChecked={
                    searchParams.get('_origin') === item ? true : false
                  }
                />
                <label htmlFor={item}>{item}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* ratin */}
      <div className="space-y-2">
        <h6>Customer Ratin</h6>
        <ul className="space-y-1 max-h-60 overflow-y-auto scrollbar">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="ratin-all"
              name="ratin"
              value={''}
              defaultChecked
              onClick={() => {
                handleSearchParams('_ratin', '')
                handleSearchParams(`_page`, String(1))
              }}
            />
            <label htmlFor="ratin-all">All</label>
          </div>
          {ratin.map((item) => (
            <li key={item.value}>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={item.value.toString()}
                  name="ratin"
                  value={item.value}
                  onClick={() => {
                    handleSearchParams('_ratin', item.value.toString())
                    handleSearchParams(`_page`, String(1))
                  }}
                  defaultChecked={
                    searchParams.get('_ratin') === item.value.toString()
                      ? true
                      : false
                  }
                />
                <label
                  htmlFor={item.value.toString()}
                  className="flex items-center gap-2"
                >
                  <RatingComponent value={item.value} />
                  {item.label}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* brand */}
      <div className="space-y-2">
        <h6>Brand</h6>
        <ul className="space-y-1 max-h-60 overflow-y-auto scrollbar">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="brand-all"
              name="brand"
              value={''}
              defaultChecked
              onClick={() => {
                handleSearchParams('_brand', '')
                handleSearchParams(`_page`, String(1))
              }}
            />
            <label htmlFor="brand-all">All</label>
          </div>
          {getBrandResult.data?.data.map((item) => (
            <li key={item}>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={item}
                  name="brand"
                  value={item}
                  onClick={() => {
                    handleSearchParams('_brand', item)
                    handleSearchParams(`_page`, String(1))
                  }}
                  defaultChecked={
                    searchParams.get('_brand') === item ? true : false
                  }
                />
                <label htmlFor={item}>{item}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* price */}
      <div className="space-y-2">
        <h6>Price</h6>
        {/* input */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            className="px-3 py-1 rounded border w-full outline-none"
            value={price_min}
            onChange={(e) => {
              setPrice_min(Number(e.target.value))
            }}
          />
          <RiSubtractFill size={40} />
          <input
            type="number"
            min={price_min}
            className="px-3 py-1 rounded border w-full outline-none"
            value={price_max}
            onChange={(e) => {
              setPrice_max(Number(e.target.value))
            }}
          />
        </div>
        <Button
          disabled={price_max < price_min || !price_max}
          size={'sm'}
          onClick={() => {
            if (price_max < price_min) {
              toast.error(
                'Price max must be greater than or equal to price min',
              )
              return
            }
            handleSearchParams('_price_min', price_min.toString())
            handleSearchParams('_price_max', price_max.toString())
            handleSearchParams(`_page`, String(1))
          }}
        >
          Apply
          <span className="ml-1 text-sm text-gray-500">
            ({price_min} - {price_max})
          </span>
        </Button>
      </div>
    </div>
  )
}

export default SidebarLeft
