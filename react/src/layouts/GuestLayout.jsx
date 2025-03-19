import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import React from "react";
import CenteredLoading from "../components/visuals/CenteredLoading.jsx";
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations, treeViewCustomizations
} from "../theme/customizations/index.js";
import {createTheme} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import AppTheme from "../theme/AppTheme.js";

export default function GuestLayout(props) {
    const {loading, user, token} = useStateContext();

    const xThemeComponents = {
        ...chartsCustomizations,
        ...dataGridCustomizations,
        ...datePickersCustomizations,
        ...treeViewCustomizations,
    };

    const theme = createTheme({
        components: {
            MuiListItemText: {
                styleOverrides: {
                    primary: {
                        color: 'white', // Set the text color of ListItems to white
                    },
                },
            },

        },
    });

    if (loading) {
        return <CenteredLoading/>; // Laadindicator tonen
    }

    if (token && user) {
        if (user.roles[0].name === "admin") {
            return <Navigate to="/admin"/>;
        }
        if (user.roles[0].name === "bedrijf") {
            return <Navigate to="/bedrijf"/>;
        }
        if (user.roles[0].name === "provincie") {
            return <Navigate to="/provincie"/>;
        }
        if (user.roles[0].name === "collectief") {
            return <Navigate to="/collectief"/>;
        }
        if (user.roles[0].name === "programmaleider") {
            return <Navigate to="/collectief"/>;
        }
    }

    return (
        <AppTheme {...props}  themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Outlet/>
        </AppTheme>
    )

}
