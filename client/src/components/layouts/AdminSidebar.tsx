import clsx from 'clsx'
import React from 'react'
import { IoMdCart } from 'react-icons/io'
import { MdDashboard, MdGroup } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { PiSignOutLight } from 'react-icons/pi'
import { useAuthStore } from '@/features/authentication/stores/auth.store'

const links = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    icon: <MdDashboard />,
  },
  {
    to: '/admin/product',
    label: 'Product',
    icon: <MdDashboard />,
  },
  {
    to: '/admin/customer',
    label: 'Customer',
    icon: <MdGroup />,
  },
  {
    to: '/admin/order',
    label: 'Order',
    icon: <IoMdCart />,
  },
  {
    to: '/admin/report',
    label: 'Report',
    icon: <MdDashboard />,
  },
]

const AdminSidebar = () => {
  const { signout } = useAuthStore()
  return (
    <div className="max-w-xs w-full p-4 bg-boxColor h-full">
      <NavLink
        to={`/admin/dashboard`}
        className={'font-semibold text-xl mb-4 block'}
      >
        E Shop
      </NavLink>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                clsx([
                  'flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200',
                  isActive && `bg-gray-200`,
                ])
              }
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
        <li
          className={clsx([
            'flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer',
          ])}
          onClick={signout}
        >
          <PiSignOutLight />
          Logout
        </li>
      </ul>
    </div>
  )
}

export default AdminSidebar
