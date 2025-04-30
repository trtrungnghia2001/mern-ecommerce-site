import { useAddressStore } from '@/features/address/stores/address.store'
import ShippingCardList from '@/features/payment/components/ShippingCardList'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

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
    <ShippingCardList
      datas={addresses}
      isLoading={getResult.isLoading}
      paginate={{
        current_page: getResult.data?.data.paginations.page || 1,
        total_pages: getResult.data?.data.paginations.total_pages || 1,
        onChange: (e) => handleSearchParams('_page', e as unknown as string),
      }}
    />
  )
}

export default ShippingPage
