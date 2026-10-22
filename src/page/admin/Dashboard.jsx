import React from 'react'
// import { useAuth } from '../../context/AuthContext'
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authSlice';

const Dashboard = () => {
    // const {logout, user} = useAuth();
    const user = useSelector((state)=>state.auth.user)
    const dispatch = useDispatch();

  return (
    <div>
        <h3>Dashboard</h3>
        <h4>Welcome {user.role}</h4>
        <div>
            <button onClick={()=>dispatch(logout())}>Logout</button>
        </div>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard