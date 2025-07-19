import React, { memo } from 'react'
import FooterComponent from './FooterComponent'
import ButtonToTop from '../ButtonToTop'
import AdminSidebar from './AdminSidebar'
import { useAuthStore } from '@/features/authentication/stores/auth.store'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { MdSearch } from 'react-icons/md'
import { FaRegBell } from 'react-icons/fa'
import { IMAGE_NOTFOUND } from '@/constants/image.constant'

const AdminLayout = () => {
  const { user } = useAuthStore()

  if (user?.role !== 'admin') return <Navigate to={`/admin`} />

  return (
    <div>
      <div className="flex items-stretch min-h-screen">
        <AdminSidebar />
        <div className="flex-1 overflow-hidden h-full">
          <div className="flex items-center justify-end gap-2 bg-boxColor p-4 shadow">
            <NavLink to={`/admin/search`}>
              <MdSearch size={20} />
            </NavLink>
            <NavLink to={`/admin/searcg`}>
              <FaRegBell size={16} />
            </NavLink>
            <div className="w-6 aspect-square rounded-full overflow-hidden">
              <img
                src={user.avatar || IMAGE_NOTFOUND.AVATAR_NOTFOUND}
                alt="avatar"
              />
            </div>
          </div>
          <div className="p-4 ">
            <Outlet />
          </div>
        </div>
      </div>
      <FooterComponent />
      <ButtonToTop />
    </div>
  )
}

export default memo(AdminLayout)
