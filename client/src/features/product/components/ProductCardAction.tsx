import React, { memo, useEffect, useState } from 'react'
import { ProductType } from '../types/product.type'
import { useProductStore } from '../stores/product.store'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { IoCartOutline } from 'react-icons/io5'
import { useCartStore } from '@/features/cart/stores/cart.store'

const ProductCardAction = ({ data }: { data: ProductType }) => {
  // cart
  const { addCart } = useCartStore()
  const addToCartResult = useMutation({
    mutationFn: async () => {
      return await addCart(data._id, 1)
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  // favorite
  const [checkedFavorite, setCheckedFavorite] = useState(false)
  useEffect(() => {
    setCheckedFavorite(data.isFavorite)
  }, [data.isFavorite])
  const { addFavorite, removeFavorite } = useProductStore()
  const toggledFavoriteResult = useMutation({
    mutationFn: async () => {
      if (!checkedFavorite) {
        return await addFavorite(data._id)
      } else {
        return await removeFavorite(data._id)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      setCheckedFavorite(!checkedFavorite)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  return (
    <div className="hidden group-hover:flex flex-col gap-2 transition absolute top-2 right-2 border p-2 rounded-lg bg-white shadow text-base">
      <button
        disabled={addToCartResult.isPending}
        onClick={() => addToCartResult.mutate()}
      >
        <IoCartOutline />
      </button>
      <button
        disabled={toggledFavoriteResult.isPending}
        onClick={() => toggledFavoriteResult.mutate()}
      >
        {checkedFavorite ? (
          <MdFavorite className="text-red-500" />
        ) : (
          <MdFavoriteBorder />
        )}
      </button>
    </div>
  )
}

export default memo(ProductCardAction)
