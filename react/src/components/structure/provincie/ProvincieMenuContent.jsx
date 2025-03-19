import * as React from 'react';
import {Link} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DatasetIcon from '@mui/icons-material/Dataset';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PersonIcon from '@mui/icons-material/Person';
import TableChartIcon from '@mui/icons-material/TableChart';
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";

export default function ProvincieMenuContent() {

    const {t} = useTranslation();

    const mainItems = [
        {text: t("menu.dashboard"), icon: <HomeRoundedIcon/>, link: '/provincie/dashboard'},
        {text: t("menu.overview_total"), icon: <AnalyticsIcon/>, link: '/admin/overzicht/totaal'},
    ];

    const settingItems = [
        {text: t("menu.bbm_codes"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/bbmcodes'},
        {text: t("menu.bbm_kpis"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/bbmkpis'},
        {text: t("menu.scangis_packages"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/scangis'},
        {text: t("menu.anlb_packages"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/anlb'},
    ];

    return (

        <Stack sx={{flexGrow: 1, p: 4,}}>
            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                {t("menu.overviews")}
            </Typography>
            <List dense>
                {mainItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600, mt: 1}}>
                {t("menu.settings")}
            </Typography>
            <List dense>
                {settingItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Stack>
    );
}
