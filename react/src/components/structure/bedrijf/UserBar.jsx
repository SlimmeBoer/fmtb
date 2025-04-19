import React from "react";
import Stack from "@mui/material/Stack";
import {Avatar} from "@mui/material";
import {showFullName} from "../../../helpers/FullName.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuButton from "../../visuals/MenuButton.jsx";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";
import axiosClient from "../../../axios_client.js";
import {Navigate} from "react-router-dom";
import DownloadManual from "../../visuals/DownloadManual.jsx";
import FAQScreen from "../../visuals/FAQScreen.jsx";

export default function UserBar() {


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
        <Stack
            direction="row"
            sx={{
                pb: 3,
                gap: 3,
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}
        >

            <Box sx={{width: 200}}>
                <Typography variant="body2" sx={{ lineHeight: '16px'}}>
                    {showFullName(user.first_name, user.middle_name, user.last_name)}
                </Typography>
                <Typography variant="caption" sx={{color: 'text.secondary'}}>
                    {user.email}
                </Typography>
            </Box>
            <DownloadManual/>
            <FAQScreen/>
            <MenuButton
                aria-label="Open menu"
                onClick={onLogout}
                sx={{borderColor: 'transparent'}}
            >
                <LogoutRoundedIcon/>
            </MenuButton>
        </Stack>
    )

}


