import * as React from 'react';
import {styled} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, {drawerClasses} from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from '../visuals/SelectContent.jsx';
import MenuContent from './MenuContent.jsx';
import CardAlert from '../visuals/CardAlert.jsx';
import OptionsMenu from './OptionsMenu.jsx';
import {showFullName} from "../../helpers/FullName.js";

import {useStateContext} from "../visuals/contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import axiosClient from "../../axios_client.js";
import {Navigate} from "react-router-dom";

const drawerWidth = 300;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

export default function SideMenu() {
    const {user, token, setUser, setToken, notification} = useStateContext();
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

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
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: {xs: 'none', md: 'block'},
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                },
            }}
        >
            <Box
                component="img"
                sx={{
                    height: 90,
                    width: 300,

                }}
                alt="Agriviewer Logo"
                src="/images/logo.png"
            />

            <Divider/>
            <Box
                sx={{
                    display: 'flex',
                    mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                    p: 1.5,
                }}
            >
                <SelectContent/>
            </Box>
            <Divider/>
            <MenuContent/>
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Avatar
                    sizes="small"
                    alt={showFullName(user.first_name, user.middle_name, user.last_name)}
                    src="/static/images/avatar/7.jpg"
                    sx={{width: 36, height: 36}}
                />
                <Box sx={{mr: 'auto'}}>
                    <Typography variant="body2" sx={{fontWeight: 500, lineHeight: '16px'}}>
                        {showFullName(user.first_name, user.middle_name, user.last_name)}
                    </Typography>
                    <Typography variant="caption" sx={{color: 'text.secondary'}}>
                        {user.email}
                    </Typography>
                </Box>
                <OptionsMenu/>
            </Stack>
        </Drawer>
    );
}
