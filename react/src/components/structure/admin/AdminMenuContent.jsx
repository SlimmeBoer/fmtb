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

export default function AdminMenuContent() {

    const {t} = useTranslation();

    const mainItems = [
        {text: t("menu.dashboard"), icon: <HomeRoundedIcon/>, link: '/admin/dashboard'},
        {text: t("menu.overview_total"), icon: <AnalyticsIcon/>, link: '/admin/overzicht/totaal'},
        {text: t("menu.overview_collective"), icon: <AnalyticsIcon/>, link: '/admin/overzicht/collectief'},
        {text: t("menu.overview_individual"), icon: <AnalyticsIcon/>, link: '/admin/overzicht/individueel'},
        {text: t("menu.management_data"), icon: <TableChartIcon/>, link: '/admin/overzicht/managementdata'},
    ];

    const klwItems = [
        {text: t("menu.klw_import"), icon: <ImportExportIcon/>, link: '/admin/klw/importeren'},
        {text: t("menu.mbp_sma_import"), icon: <ImportExportIcon/>, link: '/admin/klw/importeermbpsma'},
        {text: t("menu.klw_data_management"), icon: <DatasetIcon/>, link: '/admin/klw/data'},
    ];

    const gisItems = [
        {text: t("menu.gis_import"), icon: <ImportExportIcon/>, link: '/admin/gis/importeren'},
        {text: t("menu.gis_data_management"), icon: <DatasetIcon/>, link: '/admin/gis/data'},
    ];

    const settingItems = [
        {text: t("menu.bbm_codes"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/bbmcodes'},
        {text: t("menu.bbm_kpis"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/bbmkpis'},
        {text: t("menu.scangis_packages"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/scangis'},
        {text: t("menu.anlb_packages"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/anlb'},
    ];

    const userItems = [
        {text: t("menu.user_management"), icon: <PersonIcon/>, link: '/admin/users/'},
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
                {t("menu.klw")}
            </Typography>
            <List dense>
                {klwItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600, mt: 1}}>
                {t("menu.scangis")}
            </Typography>
            <List dense>
                {gisItems.map((item, index) => (
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

            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600, mt: 1}}>
                {t("menu.users")}
            </Typography>
            <List dense>
                {userItems.map((item, index) => (
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
