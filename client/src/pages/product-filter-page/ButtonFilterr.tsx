import React, { memo, useEffect, useState } from 'react'

import { FaFilter } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import {
  getBrandApi,
  getCategoryApi,
  getOriginApi,
} from '@/services/common.service'
import RatingComponent from '@/components/RatingComponent'
import { RiSubtractFill } from 'react-icons/ri'
import { Button } from '@/components/ui/button'
import { MdClose } from 'react-icons/md'

const ButtonFilterr = ({
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

  const [brand, setBrand] = useState('')
  const [origin, setOrigin] = useState('')
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState('')

  const [price_min, setPrice_min] = useState(0)
  const [price_max, setPrice_max] = useState(0)

  useEffect(() => {
    setCategory(searchParams.get(`_category`) || '')
    setBrand(searchParams.get(`_brand`) || '')
    setOrigin(searchParams.get(`_origin`) || '')
    setRating(searchParams.get(`_rating`) || '')
    setPrice_min(Number(searchParams.get(`_price_min`) || 0))
    setPrice_max(Number(searchParams.get(`_price_max`) || 0))
  }, [searchParams])

  const [show, setShow] = useState(false)
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [show])
  return (
    <>
      <button
        onClick={() => {
          setShow(true)
        }}
        className="lg:hidden border rounded px-2 py-1 text-xs flex items-center gap-1"
      >
        <FaFilter />
        Filter
      </button>
      {show && (
        <div className="z-50 fixed inset-0 bg-black/60 overflow-y-auto">
          <div className="bg-boxColor rounded-lg max-w-xl w-full mx-auto">
            {/* header */}
            <div className="p-4 text-center border-b relative">
              <h4>All filters</h4>
              <button
                onClick={() => {
                  setShow(false)
                }}
                className="absolute top-4 right-4"
              >
                <MdClose size={20} />
              </button>
            </div>
            {/* main */}
            <div className="px-6 py-4 space-y-4">
              {/* category */}
              <div className="space-y-2 pb-4 border-b">
                <h6>Category</h6>
                <ul className="space-y-1 max-h-60 overflow-y-auto grid gap-x-4 grid-cols-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="mb-category-all"
                      name="category"
                      value={''}
                      onClick={() => {
                        setCategory('')
                      }}
                      defaultChecked
                    />
                    <label htmlFor="mb-category-all">All</label>
                  </div>
                  {getCategoryResult.data?.data?.map((item) => (
                    <li key={item}>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={'mb-' + item}
                          name="category"
                          value={item}
                          onClick={() => {
                            setCategory(item)
                          }}
                          defaultChecked={category === item ? true : false}
                        />
                        <label htmlFor={'mb-' + item}>{item}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* origin */}
              <div className="space-y-2 pb-4 border-b">
                <h6>Seller</h6>
                <ul className="space-y-1 max-h-60 overflow-y-auto grid gap-x-4 grid-cols-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="mb-origin-all"
                      name="origin"
                      value={''}
                      defaultChecked
                      onClick={() => {
                        setOrigin('')
                      }}
                    />
                    <label htmlFor="mb-origin-all">All</label>
                  </div>
                  {getOriginResult.data?.data?.map((item) => (
                    <li key={item}>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={'mb-' + item}
                          name="origin"
                          value={item}
                          onClick={() => {
                            setOrigin(item)
                          }}
                          defaultChecked={
                            searchParams.get('_origin') === item ? true : false
                          }
                        />
                        <label htmlFor={'mb-' + item}>{item}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* ratin */}
              <div className="space-y-2 pb-4 border-b">
                <h6>Customer Ratin</h6>
                <ul className="space-y-1 max-h-60 overflow-y-auto grid gap-x-4 grid-cols-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="mb-ratin-all"
                      name="ratin"
                      value={''}
                      defaultChecked
                      onClick={() => {
                        setRating('')
                      }}
                    />
                    <label htmlFor="mb-ratin-all">All</label>
                  </div>
                  {ratin?.map((item) => (
                    <li key={item.value}>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={'mb-' + item.value.toString()}
                          name="ratin"
                          value={item.value}
                          onClick={() => {
                            setRating(item.value.toString())
                          }}
                          defaultChecked={
                            searchParams.get('_ratin') === item.value.toString()
                              ? true
                              : false
                          }
                        />
                        <label
                          htmlFor={'mb-' + item.value.toString()}
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
                <ul className="space-y-1 max-h-60 overflow-y-auto grid gap-x-4 grid-cols-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="mb-brand-all"
                      name="brand"
                      value={''}
                      defaultChecked
                      onClick={() => {
                        setBrand('')
                      }}
                    />
                    <label htmlFor="mb-brand-all">All</label>
                  </div>
                  {getBrandResult.data?.data?.map((item) => (
                    <li key={item}>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={'mb-' + item}
                          name="brand"
                          value={item}
                          onClick={() => {
                            setBrand(item)
                          }}
                          defaultChecked={
                            searchParams.get('_brand') === item ? true : false
                          }
                        />
                        <label htmlFor={'mb-' + item}>{item}</label>
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
              </div>

              {/* buttons */}
              <div>
                <Button
                  type="button"
                  onClick={() => {
                    handleSearchParams(`_brand`, brand)
                    handleSearchParams(`_origin`, origin)
                    handleSearchParams(`_category`, category)
                    handleSearchParams(`_ratin`, rating)
                    handleSearchParams(`_price_min`, price_min.toString())
                    handleSearchParams(`_price_max`, price_max.toString())
                    handleSearchParams(`_page`, `1`)

                    setShow(false)
                  }}
                >
                  View results
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default memo(ButtonFilterr)
