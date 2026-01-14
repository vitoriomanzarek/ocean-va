import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const isAuthenticated = sessionStorage.getItem('vaFormAuthenticated') === 'true'

  if (!isAuthenticated) {
    // Redirect to login with the current location as state
    return <Navigate to="/va-login" state={{ from: location }} replace />
  }

  return children
}

