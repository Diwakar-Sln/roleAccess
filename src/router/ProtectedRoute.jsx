import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ requiredRole, children }) => {
  const user = useSelector((state)=> state.auth.user)
  if (!user) {
    return <Navigate to="/" replace />
  }
  if (requiredRole && user.role !== requiredRole) {
    if(user.role === "merchant"){
      return <Navigate to="/user" replace />
    }
    if(user.role === "admin"){
      return <Navigate to="/admin" replace />
    }
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRoute