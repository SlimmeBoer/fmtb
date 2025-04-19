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
import ImportExportIcon from '@mui/icons-material/ImportExport';
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import ReportIcon from '@mui/icons-material/Report';
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export default function BeheerderMenuContent() {

    const {t} = useTranslation();

    const mainItems = [
        {text: t("beheerder_menu.dashboard"), icon: <HomeRoundedIcon/>, link: '/beheerder/dashboard'},
        {text: t("beheerder_menu.overview_total"), icon: <AnalyticsIcon/>, link: '/beheerder/scores/totaal'},
        {text: t("beheerder_menu.overview_collective"), icon: <AnalyticsIcon/>, link: '/beheerder/scores/collectief'},
        {text: t("beheerder_menu.overview_individual"), icon: <AnalyticsIcon/>, link: '/beheerder/scores/individueel'},
        {text: t("beheerder_menu.confrontation_matrix"), icon: <ReportIcon/>, link: '/beheerder/matrix'},
    ];

    const dataItems = [
        {text: t("beheerder_menu.klw_import"), icon: <ImportExportIcon/>, link: '/beheerder/klw/importeren'},
        {text: t("beheerder_menu.klw_data"), icon: <AnalyticsIcon/>, link: '/beheerder/klw/data'},
        {text: t("beheerder_menu.gis_import"), icon: <ImportExportIcon/>, link: '/beheerder/gis/importeren'},
        {text: t("beheerder_menu.gis_data"), icon: <AnalyticsIcon/>, link: '/beheerder/gis/data'},
    ];

    const settingItems = [
        {text: t("beheerder_menu.faq"), icon: <ContactSupportIcon/>, link: '/beheerder/faq'},
        {text: t("beheerder_menu.bbm_codes_kpis"), icon: <SettingsRoundedIcon/>, link: '/beheerder/settings/bbmkpis'},
        {text: t("beheerder_menu.scangis_anlb"), icon: <SettingsRoundedIcon/>, link: '/beheerder/settings/scangisanlb'},
        {text: t("beheerder_menu.kpi_criteria"), icon: <SettingsRoundedIcon/>, link: '/beheerder/settings/criteria'},
    ];

    return (

        <Stack sx={{flexGrow: 1, p: 4,}}>
            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                {t("beheerder_menu.overviews")}
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
                {t("beheerder_menu.data")}
            </Typography>
            <List dense>
                {dataItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600, mt: 1}}>
                {t("beheerder_menu.settings")}
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
