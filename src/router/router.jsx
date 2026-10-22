import { createBrowserRouter } from "react-router-dom";
import Login from "../page/auth/Login";
import Signup from "../page/auth/Signup";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../page/admin/Dashboard";
import Root from "../components/Root";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "*",
        element: <h1>Page not found</h1>
    },
    {
        path: "/",
        element: <Root />
    },
    {
        // path:"/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            }
        ]
    },
    {
        path: "/user",
        element:
        <ProtectedRoute requiredRole="user">
            <MainLayout />
        </ProtectedRoute>,
        children: [
            {
                index: true,
                element: <Dashboard />
            }
        ]
    },
    {
        path: "/admin",
        element: 
        <ProtectedRoute requiredRole="admin">
            <MainLayout />
        </ProtectedRoute>,
        children: [{
            index: true,
            element: <Dashboard />
        }]
    }
])

export default router