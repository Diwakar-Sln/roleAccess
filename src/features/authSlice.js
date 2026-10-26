import { createSlice } from "@reduxjs/toolkit";

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem("auth-user"))
    } catch {
        return null
    }
}

const initialState = {
    user: getStoredUser(),
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null;
        }
    }
})

export default authSlice.reducer
export const {logout, setCredentials} = authSlice.actions