import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <h3>MainLayout</h3>
        <Outlet/>
    </div>
  )
}

export default MainLayout