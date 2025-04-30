import { ResponseSuccessListType, ResponseSuccessType } from '@/utils/type.util'

export type AddressType = {
  _id: string
  fullName: string
  phoneNumber: string
  province: string
  district: string
  ward: string
  address: string
  isDefault: boolean
}

export type AddressStoreType = {
  addresses: AddressType[]
  createAddress: (
    data: Partial<AddressType>,
  ) => Promise<ResponseSuccessType<AddressType>>
  updateAddressById: (
    id: string,
    data: Partial<AddressType>,
  ) => Promise<ResponseSuccessType<AddressType>>
  deleteAddressById: (id: string) => Promise<ResponseSuccessType<AddressType>>
  getAddressesByMe: (
    query?: string,
  ) => Promise<ResponseSuccessListType<AddressType>>
  getAddressById: (id: string) => Promise<ResponseSuccessType<AddressType>>
  getAddressByDefault: () => Promise<ResponseSuccessType<AddressType>>
}
