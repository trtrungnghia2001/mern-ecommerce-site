import { Button } from '@/components/ui/button'
import { useAddressStore } from '@/features/address/stores/address.store'
import ShippingCardList from '@/features/payment/components/ShippingCardList'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ShippingPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const { addresses, getAddressesByMe } = useAddressStore()
  const getResult = useQuery({
    queryKey: ['me', 'shipping', searchParams.toString()],
    queryFn: async () => {
      return getAddressesByMe(searchParams.toString())
    },
  })
  return (
    <div className="space-y-4">
      <Link to={`/me/address-book/create`}>
        <Button className="w-full">
          <MdAdd />
          Add new address
        </Button>
      </Link>
      <ShippingCardList
        datas={addresses}
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

export default ShippingPage
