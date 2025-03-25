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

export default function CollectiefMenuContent() {

    const {t} = useTranslation();

    const mainItems = [
        {text: t("collectief_menu.dashboard"), icon: <HomeRoundedIcon/>, link: '/collectief/dashboard'},
        {text: t("collectief_menu.overview_collective"), icon: <AnalyticsIcon/>, link: '/collectief/scores/collectief'},
        {text: t("collectief_menu.overview_individual"), icon: <AnalyticsIcon/>, link: '/collectief/scores/individueel'},
        {text: t("collectief_menu.confrontation_matrix"), icon: <ReportIcon/>, link: '/collectief/matrix'},
    ];

    const dataItems = [
        {text: t("collectief_menu.klw_import"), icon: <ImportExportIcon/>, link: '/collectief/klw/importeren'},
        {text: t("collectief_menu.klw_data"), icon: <AnalyticsIcon/>, link: '/collectief/klw/data'},
        {text: t("collectief_menu.gis_import"), icon: <ImportExportIcon/>, link: '/collectief/gis/importeren'},
        {text: t("collectief_menu.gis_data"), icon: <AnalyticsIcon/>, link: '/collectief/gis/data'},
    ];

    const settingItems = [
        {text: t("collectief_menu.bbm_codes_kpis"), icon: <SettingsRoundedIcon/>, link: '/collectief/settings/bbmkpis'},
        {text: t("collectief_menu.scangis_anlb"), icon: <SettingsRoundedIcon/>, link: '/collectief/settings/scangisanlb'},
        {text: t("collectief_menu.kpi_criteria"), icon: <SettingsRoundedIcon/>, link: '/collectief/settings/criteria'},
    ];

    return (

        <Stack sx={{flexGrow: 1, p: 4,}}>
            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                {t("collectief_menu.overviews")}
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
                {t("collectief_menu.data")}
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
                {t("collectief_menu.settings")}
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
