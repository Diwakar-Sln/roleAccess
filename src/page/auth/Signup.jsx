import React, { useState } from 'react'
// import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { signupUser } from '../../features/authSlice'
import { useDispatch } from 'react-redux'

const Signup = () => {
    const [formData, setFormData] = useState({
        email:"",
        password:"",
        cpassword:""
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    // const {signUp} = useAuth()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError(null)
        try {
            await dispatch(signupUser(formData)).unwrap()
            navigate("/")
        } catch (message) {
            setError(message)
        }finally {
            setLoading(false)
        }
        // const result = signUp(formData)
        // if(!result.success){
        //     setError(result.message)
        //     setLoading(false)
        //     return;
        // }
        // setFormData({
        //     email:"",
        //     password:"",
        //     cpassword:""
        // })
        // setLoading(false)
        // navigate("/")
    }
  return (
    <div>
        <h3>Signup</h3>
        {error && <span>{error}</span>}
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email </label>
                <input type="text" placeholder='Enter your email' name='email'
                value={formData.email}
                onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="password">Password </label>
                <input type="password" placeholder='Enter your password' name='password'
                value={formData.password}
                onChange={handleChange}  />
            </div>
            <div>
                <label htmlFor="cpassword">Confirm Password </label>
                <input type="password" placeholder='Confirm your password' name='cpassword'
                value={formData.cpassword}
                onChange={handleChange}  />
            </div>
            <div>
                <button type='submit'>{loading ? "Loading..." : "Sign Up"}</button>
            </div>
            <div>
                <p>Already have an account ? <a href="/">Login</a></p>
            </div>
        </form>
    </div>
  )
}

export default Signup