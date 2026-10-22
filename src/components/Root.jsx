import React, { useEffect } from 'react'
// import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Root = () => {
  // const {user} = useAuth()
  const user = useSelector((state)=>state.auth.user)
  const navigate = useNavigate();
  useEffect(()=>{
    if(user){
      if(user.role === "admin"){
        navigate("/dashboard")
      }else{
        navigate("/")
      }
    }
  }, [user])
  return null
}

export default Root