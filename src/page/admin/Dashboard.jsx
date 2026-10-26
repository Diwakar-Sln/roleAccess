import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../features/authSlice';

const Dashboard = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();
    const handleLogout = () => {
        localStorage.removeItem("auth-user");
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/")
    }
  return (
    <div>
        <h3>Dashboard</h3>
        <h4>Welcome {user?.name} {user?.role}</h4>
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard