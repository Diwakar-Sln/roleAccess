import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/authSlice';

const Login = () => {
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    // const { login } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
    }
    const loginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError(null)
        try {
            const user = await dispatch(loginUser(formData)).unwrap()
            setFormData({
                email:"",
                password:""
            })
            navigate(user.role === "user" ? "/user" : "/admin")
        } catch(message) {
            setError(message)
        }finally{
            setLoading(false)
        }
        // const result = loginUser(formData);
        // if(!result.success){
        //     setError(result.message)
        //     setLoading(false)
        //     return;
        // }
        // setFormData({
        //     email:"",
        //     password:""
        // })
        // setLoading(false)
        // navigate(result.user.role === "user" ? "/user" : "/admin");
    }
  return (
    <div>
        <h3>Login</h3>
        {error && <span>{error}</span>}
        <form onSubmit={loginSubmit}>
            <div>
                <label htmlFor="email">Email </label>
                <input type="text" name='email'  placeholder='Enter your email' 
                value={formData.email} 
                onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="password">Password </label>
                <input type="password" name='password' placeholder='Enter your email' 
                value={formData.password} 
                onChange={handleChange} />
            </div>
            <div>
                <button type='submit'>{loading ? "Loading..." : "Submit"}</button>
            </div>
            <div>
                <p>Don't have an account ? <a href="/signup">Create One</a></p>
            </div>
        </form>
    </div>
  )
}

export default Login