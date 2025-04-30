import { memo } from 'react'
import { useRoutes } from 'react-router-dom'
import PublicRouter from './public.router'
import PublicLayout from '@/components/layouts/PublicLayout'
import AdminRouter from './admin.router'
import AdminLayout from '@/components/layouts/AdminLayout'

const MainRouter = () => {
  const router = useRoutes([
    {
      path: '/*',
      element: (
        <PublicLayout>
          <PublicRouter />
        </PublicLayout>
      ),
    },
    // {
    //   path: '/admin/*',
    //   element: (
    //     <AdminLayout>
    //       <AdminRouter />
    //     </AdminLayout>
    //   ),
    // },
  ])

  return router
}

export default memo(MainRouter)
