import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const ADMIN_EMAIL = "admin@example.com"

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem("auth-user"))
    } catch {
        return null
    }
}

const getRegisteredUsers = () => JSON.parse(localStorage.getItem("registered-users") || "[]")

export const loginUser = createAsyncThunk("auth/login", async ({email,password}, {rejectWithValue}) => {
    if(email.toLowerCase() === ADMIN_EMAIL){
        const adminUser = {
            email:ADMIN_EMAIL,
            role:"admin"
        }
        localStorage.setItem("auth-user", JSON.stringify(adminUser))
        return adminUser
    }

    const existingUser = getRegisteredUsers().find((item) => item.email.toLowerCase() === email.toLowerCase());
    if(!existingUser){
        return rejectWithValue("Mail id doesnot exist create one")
    }
    if(existingUser.password !== password){
        return rejectWithValue("Incorrect password")
    }
    const sessionUser = {
        email:existingUser.email,
        role:existingUser.role
    }
    localStorage.setItem("auth-user", JSON.stringify(sessionUser))
    return sessionUser
})

export const signupUser = createAsyncThunk("auth/signup", ({email,password}, {rejectWithValue}) => {
    const users = getRegisteredUsers();
    const existingUsers = users.some((item) => item.email.toLowerCase() === email.toLowerCase())
    if(existingUsers){
        return rejectWithValue("User already exists")
    }
    const role = email.toLowerCase() === ADMIN_EMAIL ? "admin" : "user"
    const newUsers = {email, password, role}
    const updatedUsers = [...users, newUsers]
    localStorage.setItem("registered-users", JSON.stringify(updatedUsers))
    return "User registered successfully"
})

const initialState = {
    user: getStoredUser(),
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state,action) => {
            state.user = action.payload
        })
    },
})

export default authSlice.reducer
export const {logout} = authSlice.actions