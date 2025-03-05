import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import React from "react";

export default function GuestLayout() {
    const {loading, token, user} = useStateContext();

    if (loading) {
        return <div>Laden...</div>; // Laadindicator tonen
    }

    if (user) {
        if (user.roles[0].name === "admin") {
            return <Navigate to="/admin"/>;
        }
        if (user.roles[0].name === "bedrijf") {
            return <Navigate to="/bedrijf"/>;
        }
    }

    return (
        <div>
            <Outlet/>
        </div>
    )

}
