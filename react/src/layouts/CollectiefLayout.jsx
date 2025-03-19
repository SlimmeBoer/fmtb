import * as React from 'react';
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios_client.js";
import {Outlet} from "react-router-dom";
import {Box, CssBaseline, Stack} from "@mui/material";
import {alpha, createTheme} from '@mui/material/styles';
import Header from '../components/structure/Header.jsx';
import AdminSideMenu from '../components/structure/admin/AdminSideMenu.jsx';
import AppTheme from '../theme/AppTheme.jsx';

import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from '../theme/customizations/index.js';


export default function CollectiefLayout(props) {
    const {setUser, setToken} = useStateContext();

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

    const drawerWidth = '300px';

    return (
        <AppTheme {...props}  themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <ProvincieSideMenu />
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


