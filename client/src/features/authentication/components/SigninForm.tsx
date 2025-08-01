import React, { memo } from 'react'
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
import { SigninType } from '../types/auth.type'
import toast from 'react-hot-toast'
import LoaderComponent from '@/components/common/loader-component'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
})

interface SigninFormProps {
  isAdmin?: boolean
}

const SigninForm = ({ isAdmin }: SigninFormProps) => {
  const { signin } = useAuthStore()
  const signupResult = useMutation({
    mutationFn: async (values: SigninType) => {
      return await signin(values)
    },
    onSuccess: (data) => {
      if (isAdmin && data.data.user.role === 'admin') {
        toast.success('Welcome Admin!')
        navigate('/admin/dashboard')
      } else if (isAdmin && data.data.user.role !== 'admin') {
        toast.error('You are not authorized to access this page.')
      } else {
        toast.success(data.message)
        navigate(`/`)
      }
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
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    signupResult.mutate(values)
  }

  const navigate = useNavigate()

  return (
    <>
      {signupResult.isPending && <LoaderComponent />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Signin
          </Button>
        </form>
      </Form>
    </>
  )
}

export default memo(SigninForm)
