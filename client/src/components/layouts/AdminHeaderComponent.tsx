import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminHeaderComponent = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-boxColor shadow">
      <NavLink to={`/admin/dashboard`}>E Shop</NavLink>
    </header>
  )
}

export default AdminHeaderComponent
