import * as React from 'react';
import Stack from '@mui/material/Stack';
import ColorModeIconDropdown from '../../theme/ColorModeIconDropdown.jsx';
import AboutScreen from "../visuals/AboutScreen.jsx";
import DownloadManual from "../visuals/DownloadManual.jsx";

export default function Header() {
    return (
        <Stack
            direction="row"
            sx={{
                display: {xs: 'none', md: 'flex'},
                width: '100%',
                alignItems: {xs: 'flex-start', md: 'center'},
                justifyContent: 'space-between',
                maxWidth: {sm: '100%', md: '1700px'},
                pt: 1.5,
            }}
            spacing={2}
        >
            <div></div>
            <Stack direction="row" sx={{gap: 1}}>
                <ColorModeIconDropdown/>
                <DownloadManual/>
                <AboutScreen/>
            </Stack>
        </Stack>
    );
}
