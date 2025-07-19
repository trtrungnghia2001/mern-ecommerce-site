import { memo } from 'react'
import { useRoutes } from 'react-router-dom'

import DashboardPage from '@/pages/admin/DashboardPage'
import AdminLayout from '@/components/layouts/AdminLayout'
import AdminSigninPage from '@/pages/admin/AdminSigninPage'
import AdminProductPage from '@/pages/admin/AdminProductPage'
import AdminCustomerPage from '@/pages/admin/AdminCustomerPage'
const AdminRouter = () => {
  const router = useRoutes([
    {
      index: true,
      element: <AdminSigninPage />,
    },
    {
      path: '*',
      element: <AdminLayout />,
      children: [
        {
          path: 'dashboard',
          element: <DashboardPage />,
        },
        {
          path: 'product',
          element: <AdminProductPage />,
        },
        {
          path: 'customer',
          element: <AdminCustomerPage />,
        },
        {
          path: 'order',
          element: <DashboardPage />,
        },
        {
          path: 'report',
          element: <DashboardPage />,
        },
      ],
    },
  ])

  return router
}

export default memo(AdminRouter)
