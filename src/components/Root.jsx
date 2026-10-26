import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom'

const Root = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = useSelector((state)=>state.auth.user)

    if (!user) {
      return <Navigate to="/" replace />
    }

    if (user) {
      if (user.role === "admin") {
        navigate("/admin")
      } else if (user.role === "merchant") {
        navigate("/user")
      } else {
        navigate("/")
      }
    }
  }, [user])
  return null
}

export default Root