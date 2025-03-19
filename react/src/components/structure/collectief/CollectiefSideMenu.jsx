import * as React from 'react';
import {styled} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, {drawerClasses} from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AdminMenuContent from './AdminMenuContent.jsx';
import {showFullName} from "../../../helpers/FullName.js";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";
import axiosClient from "../../../axios_client.js";
import {Navigate} from "react-router-dom";
import MenuButton from "../../visuals/MenuButton.jsx";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CollectiefMenuContent from "./CollectiefMenuContent.jsx";

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

export default function CollectiefSideMenu() {
    const {user, token, setUser, setToken} = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

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
                    height: 200,
                    width: 200,
                    ml: 6,
                }}
                alt="Agriviewer Logo"
                src="/images/logo.png"
            />

            <CollectiefMenuContent/>
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
                    src={import.meta.env.VITE_API_BASE_URL + '/' + user.image}
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
                <MenuButton
                    aria-label="Open menu"
                    onClick={onLogout}
                    sx={{borderColor: 'transparent'}}
                >
                    <LogoutRoundedIcon/>
                </MenuButton>
            </Stack>
        </Drawer>
    );
}
