import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Root = () => {
  const navigate = useNavigate();
  useEffect(() => {

    const storedUser = localStorage.getItem("auth-user")

    if (!storedUser) {
      return <Navigate to="/" replace />
    }

    const user = JSON.parse(storedUser)

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