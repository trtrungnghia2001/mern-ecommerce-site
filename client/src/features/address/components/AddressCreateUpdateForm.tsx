import React, { memo, useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getProvincesApi } from '../services/provinces.api'
import { Textarea } from '@/components/ui/textarea'
import { useLocation, useParams } from 'react-router-dom'
import { useAddressStore } from '../stores/address.store'
import { AddressType } from '../types/address.type'
import toast from 'react-hot-toast'
import LoaderComponent from '@/components/common/loader-component'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  phoneNumber: z.string().min(1, {
    message: 'Phone number must be at least 2 characters.',
  }),
  province: z.string().min(1, {
    message: 'Please select a province.',
  }),
  district: z.string().min(1, {
    message: 'Please select a district.',
  }),
  ward: z.string().min(1, {
    message: 'Please select a ward.',
  }),
  address: z.string().min(1, {
    message: 'Please enter your address.',
  }),
  isDefault: z.boolean({
    message: 'Please select if this is your default address.',
  }),
})

const AddressCreateUpdateForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      address: '',
      isDefault: false,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    createUpdateResult.mutate(values)
  }

  // Get provinces
  const [selectProvince, setSelectProvince] = useState('')
  const [selectDistrict, setSelectDistrict] = useState('')
  const getProvincesApiResult = useQuery({
    queryKey: ['provinces'],
    queryFn: async () => {
      return await getProvincesApi()
    },
  })
  const provinceOptions = useMemo(() => {
    if (getProvincesApiResult.data && getProvincesApiResult.isSuccess) {
      const provinceOptions = getProvincesApiResult.data.map((province) => ({
        value: province.name,
        label: province.name,
        districts: province.districts.map((district) => ({
          value: district.name,
          label: district.name,
          wards: district.wards.map((ward) => ({
            value: ward.name,
            label: ward.name,
          })),
        })),
      }))
      const districtOptions = provinceOptions.find(
        (item) => item.value === selectProvince,
      )?.districts
      const wardOptions = districtOptions?.find(
        (item) => item.value === selectDistrict,
      )?.wards
      return {
        provinceOptions,
        districtOptions,
        wardOptions,
      }
    }
    return {
      provinceOptions: [],
      districtOptions: [],
      wardOptions: [],
    }
  }, [getProvincesApiResult.data, selectProvince, selectDistrict])

  const location = useLocation()
  const { id } = useParams()
  const getDataByIdResult = useQuery({
    queryKey: ['me', 'address', id],
    queryFn: async () => {
      return await getAddressById(id as string)
    },
    enabled: !!id,
  })
  useEffect(() => {
    if (getDataByIdResult.isSuccess && location.pathname.includes('update')) {
      Object.entries(form.getValues()).forEach(([key]) => {
        form.setValue(
          key as keyof z.infer<typeof formSchema>,
          getDataByIdResult.data.data[key as keyof z.infer<typeof formSchema>],
        )
      })
      setSelectProvince(getDataByIdResult.data.data.province)
      setSelectDistrict(getDataByIdResult.data.data.district)
    }
  }, [getDataByIdResult.data, location.pathname])

  const { createAddress, updateAddressById, getAddressById } = useAddressStore()
  const createUpdateResult = useMutation({
    mutationFn: async (values: Partial<AddressType>) => {
      if (id && location.pathname.includes(`update`)) {
        return await updateAddressById(id, values)
      }
      return await createAddress(values)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      form.reset()
    },
    onError: (error) => {
      toast.error(error.message)
      console.error('Error:', error)
    },
  })

  return (
    <>
      {(createUpdateResult.isPending || getDataByIdResult.isLoading) && (
        <LoaderComponent />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-boxColor p-4 rounded-lg space-y-4"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value !== '') {
                      field.onChange(value)
                      setSelectProvince(value)
                    }
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a provice" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {provinceOptions?.provinceOptions?.map((provinceOption) => (
                      <SelectItem
                        key={provinceOption.value}
                        value={provinceOption.value}
                      >
                        {provinceOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value !== '') {
                      field.onChange(value)
                      setSelectDistrict(value)
                    }
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a district" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {provinceOptions?.districtOptions?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ward"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ward</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value !== '') {
                      field.onChange(value)
                    }
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a ward" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {provinceOptions?.wardOptions?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={getDataByIdResult.data?.data.isDefault}
                  />
                </FormControl>
                <FormLabel className="mt-0">Set as default address</FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}

export default memo(AddressCreateUpdateForm)
