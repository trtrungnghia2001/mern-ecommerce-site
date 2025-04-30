import { Button } from '@/components/ui/button'
import AddressCardList from '@/features/address/components/AddressCardList'
import { useAddressStore } from '@/features/address/stores/address.store'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

const AddressBookPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const { addresses, getAddressesByMe } = useAddressStore()
  const getResult = useQuery({
    queryKey: ['me', 'address-book', searchParams.toString()],
    queryFn: async () => {
      return getAddressesByMe(searchParams.toString())
    },
  })
  return (
    <div className="space-y-2">
      <Link to={`create`}>
        <Button className="w-full">
          <MdAdd />
          Add new address
        </Button>
      </Link>
      <AddressCardList
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

export default AddressBookPage
