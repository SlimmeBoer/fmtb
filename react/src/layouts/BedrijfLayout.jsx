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

export default function BedrijfLayout(props) {
    const {loading, user} = useStateContext();

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

    return (
        <AppTheme {...props}  themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Outlet/>
        </AppTheme>
    )

}
