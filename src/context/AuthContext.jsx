import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("auth-user");
        return storedUser ? JSON.parse(storedUser) : null
    })
    const login = (userData) => {
        const adminEmail = "admin@example.com";
        if(userData.email.toLowerCase() === adminEmail){
            const adminUser = {
                email:adminEmail,
                role:"admin"
            }
            setUser(adminUser);
            localStorage.setItem("auth-user", JSON.stringify(adminUser))
            return {success:true, message:"Admin login is successfull", user:adminUser}
        }
        const users = JSON.parse(localStorage.getItem("registered-users") || "[]")
        const existingUsers = users.find((item) => item.email.toLowerCase() === userData.email.toLowerCase())
        if(!existingUsers){
            return {success: false, message: "Mail id doesnot exist create one"}
        }
        // Your current code never checks the password:
        if (existingUsers.password !== userData.password) {
            return { success: false, message: "Incorrect password" }
        }
        const sessionUser = { email: existingUsers.email, role: existingUsers.role }
        setUser(sessionUser)
        localStorage.setItem("auth-user", JSON.stringify(sessionUser))

        return {success:true, message:"Login is successfull", user:sessionUser}
    }
    const signUp = (userData) => {
        const users = JSON.parse(localStorage.getItem("registered-users") || "[]")
        const existingUsers = users.some((item) => item.email.toLowerCase() === userData.email.toLowerCase())
        if(existingUsers){
            return {success: false, message: "User already exists"}
        }
        const role = userData.email.toLowerCase() === "admin@example.com" ? "admin" : "user"
        const newUser = {
            email: userData.email,
            password:userData.password,
            role
        }
        const updatedUsers = [...users, newUser];
        localStorage.setItem("registered-users", JSON.stringify(updatedUsers))

        return {success: true, message: "User registered successfully"}
    }
    const logout = () => {
        setUser(null)
        localStorage.removeItem("auth-user")
    }
    return <AuthContext.Provider value={{user, login, signUp, logout}}>{children}</AuthContext.Provider>
}

export default AuthContextProvider