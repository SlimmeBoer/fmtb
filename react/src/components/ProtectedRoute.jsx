// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useStateContext} from "../contexts/ContextProvider.jsx";

const ProtectedRoute = ({userRole }) => {

    const { user, loading ,token} = useStateContext();

    if (loading) {
        return <div>Laden...</div>;
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
