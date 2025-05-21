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
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export default function ProvincieMenuContent() {

    const {t} = useTranslation();

    const mainItems = [
        {text: t("provincie_menu.dashboard"), icon: <HomeRoundedIcon/>, link: '/provincie/dashboard'},
        {text: t("provincie_menu.overview_total"), icon: <AnalyticsIcon/>, link: '/provincie/scores/totaal'},
        {text: t("provincie_menu.overview_individual"), icon: <AnalyticsIcon/>, link: '/provincie/scores/individueel'},
        {text: t("provincie_menu.overview_collective"), icon: <AnalyticsIcon/>, link: '/provincie/scores/collectief'},
    ];

    const settingItems = [
        {text: t("provincie_menu.faq"), icon: <ContactSupportIcon/>, link: '/provincie/faq'},
        {text: t("provincie_menu.bbm_codes_kpis"), icon: <SettingsRoundedIcon/>, link: '/provincie/settings/bbmkpis'},
        {text: t("provincie_menu.scangis_anlb"), icon: <SettingsRoundedIcon/>, link: '/provincie/settings/scangisanlb'},
        {text: t("provincie_menu.kpi_criteria"), icon: <SettingsRoundedIcon/>, link: '/provincie/settings/criteria'},
    ];

    return (

        <Stack sx={{flexGrow: 1, p: 4,}}>
            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                {t("provincie_menu.overviews")}
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
                {t("provincie_menu.settings")}
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
