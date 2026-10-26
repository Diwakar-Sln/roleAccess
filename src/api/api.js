import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath:"authapi",
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:5000/api"
    }),
    tagTypes:["Signup", "Login", "Users"],
    endpoints: (builder) => ({
        postSignup: builder.mutation({
            query: (data) => ({
                url:"/auth/signup",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Signup"]
        }),
        postLogin: builder.mutation({
            query: (data) => ({
                url:"/auth/login",
                method:"POST",
                body: data
            }),
            invalidatesTags:["Login"]
        }), 
        getUsers: builder.query({
            query: () => "/Users",
            providesTags: ["Users"]
        })
    })
})

export const {usePostSignupMutation, usePostLoginMutation, useGetUsersQuery} = authApi