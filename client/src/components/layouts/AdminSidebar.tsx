import React from 'react'
import { MdDashboard } from 'react-icons/md'
import { Link } from 'react-router-dom'

const links = [
  {
    label: `Main`,
    items: [
      {
        to: '/admin/dashboard',
        label: 'Dashboard',
        icon: <MdDashboard />,
      },
      {
        to: '/admin/user',
        label: 'User',
        icon: <MdDashboard />,
      },
      {
        to: '/admin/product',
        label: 'Product',
        icon: <MdDashboard />,
      },
      {
        to: '/admin/order',
        label: 'Order',
        icon: <MdDashboard />,
      },
    ],
  },
  {
    label: 'Report',
    items: [
      {
        to: '/',
        label: 'Analytics',
        icon: <MdDashboard />,
      },
      {
        to: '/',
        label: 'Sales',
        icon: <MdDashboard />,
      },
    ],
  },
  {
    label: 'Setting',
    items: [
      {
        to: '/',
        label: 'Profile',
        icon: <MdDashboard />,
      },
      {
        to: '/',
        label: 'Password',
        icon: <MdDashboard />,
      },
    ],
  },
]

const AdminSidebar = () => {
  return (
    <div className="max-w-xs w-full p-4 bg-boxColor rounded-lg">
      {links.map((link, index) => (
        <div key={index} className="border-b last:border-b-0 py-2">
          <h6 className="flex items-center gap-4 px-4 text-textSecondaryColor ">
            <span>{link.label}</span>
          </h6>
          {link.items && (
            <ul className="">
              {link.items.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="px-4 py-2 flex items-center gap-2"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default AdminSidebar
