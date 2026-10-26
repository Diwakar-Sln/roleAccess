import React from 'react'
import { setCredentials } from '../features/authSlice';
import { usePostLoginMutation } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const useLogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [Login, { isLoading, isError }] = usePostLoginMutation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Login(formData).unwrap()
            localStorage.setItem("auth-user", JSON.stringify(response.user));
            localStorage.setItem("token", response.token);
            dispatch(setCredentials(response.user))
            setFormData({
                email: "",
                password: ""
            })
            const role = response.user.role
            if(role === "admin"){
                navigate("/admin")
            }else if (role === "merchant"){
                navigate("/user")
            }
        } catch (error) {
            console.error("Login failed", error)
        }
    }
  return {
    isLoading, 
    isError, 
    handleChange, 
    loginSubmit,
    formData, 
  }
}

export default useLogin