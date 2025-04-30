import React, { memo } from 'react'
import FooterComponent from './FooterComponent'
import ButtonToTop from '../ButtonToTop'
import AdminSidebar from './AdminSidebar'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex items-start gap-6">
        <AdminSidebar />
        <div className="py-4">{children}</div>
      </div>

      <FooterComponent />
      <ButtonToTop />
    </div>
  )
}

export default memo(AdminLayout)
