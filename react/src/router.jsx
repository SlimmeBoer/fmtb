import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/auth/Login.jsx";
import NotFound from "./views/admin/NotFound.jsx";
import UserLayout from "./components/UserLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/admin/Dashboard.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },


])

export default router;
