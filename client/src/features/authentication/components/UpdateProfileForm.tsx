import React, { memo, useEffect, useState } from 'react'
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
import { useAuthStore } from '../stores/auth.store'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import LoaderComponent from '@/components/common/loader-component'
import { UserType } from '../types/user.type'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { gender_options } from '../constants/option.constant'
import { IMAGE_NOTFOUND } from '@/constants/image.constant'

const formSchema = z.object({
  avatar: z.string(),
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long',
  }),
  phoneNumber: z.string(),
  address: z.string(),
  birthday: z.string(),
  gender: z.string(),
  work: z.string(),
  education: z.string(),
  skills: z.string(),
  bio: z.string(),
})

const UpdateProfileForm = () => {
  const { updataMe, user } = useAuthStore()
  const updataMeResult = useMutation({
    mutationFn: async (values: Partial<UserType>) => {
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value as string),
      )

      if (file) {
        formData.append('file', file)
      }

      return await updataMe(formData)
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
      console.error('Error:', error)
    },
  })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: '',
      name: '',
      phoneNumber: '',
      address: '',
      birthday: '',
      gender: '',
      work: '',
      education: '',
      skills: '',
      bio: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    updataMeResult.mutate(values)
    // console.log({ values })
  }

  // update
  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key]) => {
        form.setValue(
          key as keyof z.infer<typeof formSchema>,
          user[key as keyof z.infer<typeof formSchema>],
        )
      })
    }
  }, [user])

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      return () => {
        URL.revokeObjectURL(url)
      }
    } else if (user?.avatar) {
      setPreview(user?.avatar)
    }
  }, [user, file])

  return (
    <>
      {updataMeResult.isPending && <LoaderComponent />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-boxColor p-4 rounded-lg space-y-4"
        >
          <label
            htmlFor="file"
            className="block mx-auto w-40 aspect-square rounded-full overflow-hidden"
          >
            <img
              src={preview || IMAGE_NOTFOUND.AVATAR_NOTFOUND}
              alt=""
              loading="lazy"
            />
            <input
              accept="image/*"
              type="file"
              id="file"
              name="file"
              onChange={(e) => setFile(e.target.files?.[0] as File)}
              className="hidden"
            />
          </label>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birthday</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={(value) =>
                    value != '' && field.onChange(value)
                  }
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {gender_options.map((item) => (
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
            name="work"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}

export default memo(UpdateProfileForm)
