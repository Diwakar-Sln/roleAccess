import React, { useState } from 'react'
// import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { usePostSignupMutation } from '../../api/api'

const Signup = () => {
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
        setFormData({
            ...formData, [name]: value
        })
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

        }
    }
    return (
        <div>
            <h3>Signup</h3>
            {isError && <p>Error will posting data</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name </label>
                    <input type="text" placeholder='Enter your name' name='name'
                        value={formData.name}
                        onChange={handleChange} />
                </div>
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
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="roles">Role</label>
                    <select name="roles"
                        value={formData.roles}
                        onChange={handleChange}>
                        <option value="">Select role</option>
                        <option value="merchant">Merchant</option>
                    </select>
                </div>
                <div>
                    <button type='submit'>{isLoading ? "loading..." : "SignUp"}</button>
                </div>
                <div>
                    <p>Already have an account ? <a href="/">Login</a></p>
                </div>
            </form>
        </div>
    )
}

export default Signup