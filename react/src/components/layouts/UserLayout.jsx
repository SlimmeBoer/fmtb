import * as React from 'react';
import {useEffect, useState} from 'react';
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {useTranslation} from "react-i18next";
import axiosClient from "../../axios_client.js";
import {Navigate, Outlet} from "react-router-dom";
import {Box, CssBaseline, Stack} from "@mui/material";
import {alpha, createTheme} from '@mui/material/styles';
import AppNavbar from "../structure/AppNavbar.jsx";
import Header from '../structure/Header.jsx';
import SideMenu from '../structure/SideMenu.jsx';
import AppTheme from '../../theme/AppTheme.jsx';

import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from '../../theme/customizations/index.js';


export default function UserLayout(props) {
    const {user, token, setUser, setToken, notification} = useStateContext();
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

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


    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/user')
            .then(({data}) => {
                setLoading(false)
                setUser(data)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    if (!token) {
        return <Navigate to="/login"/>
    }

    const drawerWidth = '300px';

    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                {/* Main content */}
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: 'auto',
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 10,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        <Outlet/>
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}


