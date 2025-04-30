import React, { memo, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/auth.store'

const AuthProtectedRouter = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const { user, isAuthenticated, signout } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated || !user) {
      signout()
    }
  }, [user, isAuthenticated])

  if (!isAuthenticated || !user)
    return <Navigate to={`/signin`} state={location} />

  return <div>{children}</div>
}

export default memo(AuthProtectedRouter)
