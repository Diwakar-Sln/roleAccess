import React from 'react'
// import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({requiredRole, children}) => {
  // const {user} = useAuth()
  const user = useSelector((state) => state.auth.user)  
  if(!user){
    return <Navigate to="/" replace />
  }
  if(requiredRole && user.role !== requiredRole){
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRoute