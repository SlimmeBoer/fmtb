// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useStateContext} from "../contexts/ContextProvider.jsx";
import CenteredLoading from "./visuals/CenteredLoading.jsx";

const ProtectedRoute = ({userRole }) => {

    const { user, loading ,token} = useStateContext();

    if (loading) {
        return <CenteredLoading />;
    }

    if (!user || !token) {
        return <Navigate to="/login" />;
    }

    if (user.roles[0].name !== userRole) {

        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
