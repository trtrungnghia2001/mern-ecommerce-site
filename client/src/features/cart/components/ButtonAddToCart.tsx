import { Button } from '@/components/ui/button'
import React from 'react'
import { useCartStore } from '../stores/cart.store'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const ButtonAddToCart = ({
  productId,
  quantity,
}: {
  productId: string
  quantity: number
}) => {
  const { addCart } = useCartStore()
  const addToCartResult = useMutation({
    mutationFn: async () => {
      return await addCart(productId, quantity)
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
      <Button
        onClick={() => addToCartResult.mutate()}
        disabled={addToCartResult.isPending}
        variant="default"
        className="w-full"
      >
        {addToCartResult.isPending && <Loader2 className="animate-spin" />}
        Add to cart
      </Button>
    </>
  )
}

export default ButtonAddToCart
