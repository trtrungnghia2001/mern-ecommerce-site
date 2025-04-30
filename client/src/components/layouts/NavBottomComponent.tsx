import React, { memo } from 'react'
import { MdCategory, MdHome } from 'react-icons/md'
import { BiSolidUserCircle } from 'react-icons/bi'
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { useAuthStore } from '@/features/authentication/stores/auth.store'
import { FaBell } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'

const nav_bottom = [
  {
    title: 'Home',
    path: '/',
    icon: <MdHome />,
  },
  {
    title: 'Cart',
    path: '/cart',
    icon: <FaCartShopping />,
  },
  {
    title: 'Notifications',
    path: '/me/notifications',
    icon: <FaBell />,
  },
  // {
  //   title: 'User',
  //   path: '/me/account',
  //   icon: <BiSolidUserCircle />,
  // },
]

const NavBottomComponent = () => {
  const { user } = useAuthStore()
  return (
    <div className="z-50 bg-itemColor border-t md:hidden fixed bottom-0 left-0 right-0 grid grid-cols-4 justify-items-center">
      {nav_bottom.map((item, index) => {
        return (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              clsx([
                `flex flex-col items-center p-2 w-full`,
                isActive && `text-blue-500`,
              ])
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-12">{item.title}</span>
          </NavLink>
        )
      })}
      {user ? (
        <NavLink
          to={`/me/account`}
          className={({ isActive }) =>
            clsx([
              `flex flex-col items-center p-2 w-full`,
              isActive && `text-blue-500`,
            ])
          }
        >
          <span className="text-xl">
            <BiSolidUserCircle />
          </span>
          <span className="text-12">Account</span>
        </NavLink>
      ) : (
        <Link
          to={`/signin`}
          className={clsx([`flex flex-col items-center p-2 w-full`])}
        >
          <span className="text-xl">
            <BiSolidUserCircle />
          </span>
          <span className="text-12">Signin</span>
        </Link>
      )}
    </div>
  )
}

export default memo(NavBottomComponent)
