import useLogin from "../../hooks/useLogin"

const Login = () => {
    const {handleChange, loginSubmit, isError, formData, isLoading} = useLogin()
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