import React, { memo } from 'react'
import { AddressType } from '../types/address.type'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useAddressStore } from '../stores/address.store'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import LoaderComponent from '@/components/common/loader-component'

const AddressCard = ({ data }: { data: AddressType }) => {
  const { deleteAddressById } = useAddressStore()
  const deleteAddressByIdResult = useMutation({
    mutationFn: async () => {
      return await deleteAddressById(data._id)
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  return (
    <>
      {deleteAddressByIdResult.isPending && <LoaderComponent />}
      <div className="p-4 rounded-lg bg-boxColor flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h6>{data.fullName}</h6>
            {data.isDefault && (
              <span className="text-green-500 text-xs">Default Address</span>
            )}
          </div>
          <p>
            <span className="text-textSecondaryColor">Address: </span>
            {data.address} {data.ward} {data.district} {data.province}
          </p>
          <p>
            <span className="text-textSecondaryColor">Phone: </span>
            {data.phoneNumber}
          </p>
        </div>
        <div className="flex justify-end gap-2">
          {/* edit button */}
          <Link to={`update/` + data._id}>
            <Button variant={'default'} size={'sm'}>
              Edit
            </Button>
          </Link>

          {/* delete button */}
          {!data.isDefault && (
            <Button
              onClick={() => deleteAddressByIdResult.mutate()}
              variant={'destructive'}
              size={'sm'}
            >
              Erase
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default memo(AddressCard)
