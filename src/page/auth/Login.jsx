import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { usePostLoginMutation } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/authSlice';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [Login, { isLoading, isError }] = usePostLoginMutation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
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
    return (
        <div>
            <h3>Login</h3>
            {isError && <p>Error while posting data</p>}
            <form onSubmit={loginSubmit}>
                <div>
                    <label htmlFor="email">Email </label>
                    <input type="text" name='email' placeholder='Enter your email'
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
                    <button type='submit'>{isLoading ? "loading..." : "Login"}</button>
                </div>
                <div>
                    <p>Don't have an account ? <a href="/signup">Create One</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login