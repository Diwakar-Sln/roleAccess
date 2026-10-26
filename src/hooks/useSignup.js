import React from 'react'
import { useNavigate } from 'react-router-dom'
import { usePostSignupMutation } from '../api/api'
import { useState } from 'react'

const useSignup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        roles: ""
    })
    const [signup, { isLoading, isError }] = usePostSignupMutation()
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev)=>({
            ...prev, [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData).unwrap();
            setFormData({
                name: "",
                email: "",
                password: "",
                roles: ""
            })
            navigate("/")
        } catch (error) {
            console.error("Signup unsessfull", error)
        }
    }
  return {
    formData, 
    handleChange, 
    handleSubmit, 
    isLoading, 
    isError
  }
}

export default useSignup