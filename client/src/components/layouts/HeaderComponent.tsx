import React, { memo } from 'react'
import { Link, NavLink } from 'react-router-dom'
import WrapperComponent from './WrapperComponent'
import { useAuthStore } from '@/features/authentication/stores/auth.store'
import { Button } from '../ui/button'
import InputSearch from '../InputSearch'
import { IoCartOutline } from 'react-icons/io5'
import { MdEmojiEmotions, MdHome } from 'react-icons/md'
import clsx from 'clsx'
import { useCartStore } from '@/features/cart/stores/cart.store'
import { useQuery } from '@tanstack/react-query'

const HeaderComponent = () => {
  const { total_quantity, getCart } = useCartStore()
  const { user } = useAuthStore()
  const getResult = useQuery({
    queryKey: ['me', 'cart'],
    queryFn: async () => {
      return getCart()
    },
    enabled: !!user,
  })

  return (
    <header className="z-50 sticky top-0 left-0 right-0 bg-boxColor py-4 px-4 shadow">
      <WrapperComponent className="md:hidden flex gap-4 items-center justify-between">
        <InputSearch className="flex-1" />
      </WrapperComponent>
      <WrapperComponent className="hidden md:flex gap-8 items-center justify-between">
        <Link to={`/`} className="font-medium text-xl">
          E-Shop
        </Link>
        <InputSearch className="flex-1 max-w-[900px] w-full" />
        <ul className="flex items-center gap-4">
          <li>
            <NavLink
              to={`/`}
              className={({ isActive }) =>
                clsx([`flex gap-0.5 items-center`, isActive && `text-blue-500`])
              }
            >
              <MdHome size={22} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/me/update-profile`}
              className={({ isActive }) =>
                clsx([`flex gap-0.5 items-center`, isActive && `text-blue-500`])
              }
            >
              <MdEmojiEmotions size={22} />
              Account
            </NavLink>
          </li>
          <li>
            <Link to={`/cart`} className="relative">
              <span className="absolute -top-2.5 -right-2 inline-block font-medium bg-red-500 text-white text-10 rounded-full px-1 py-0.5">
                {total_quantity}
              </span>
              <IoCartOutline size={22} />
            </Link>
          </li>
          {!user && (
            <li>
              <Link to={`/signin`}>
                <Button size={'sm'}>Signin</Button>
              </Link>
            </li>
          )}
        </ul>
      </WrapperComponent>
    </header>
  )
}

export default memo(HeaderComponent)
