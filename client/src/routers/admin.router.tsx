import { memo } from 'react'
import { useRoutes } from 'react-router-dom'

import DashboardPage from '@/pages/admin/DashboardPage'

const AdminRouter = () => {
  const router = useRoutes([
    {
      index: true,
      element: <DashboardPage />,
    },
  ])

  return router
}

export default memo(AdminRouter)
