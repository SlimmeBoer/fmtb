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
import BadgeIcon from '@mui/icons-material/Badge';
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";

const mainItems = [
    {text: 'Dashboard', icon: <HomeRoundedIcon/>, link: '/dashboard'},
    {text: 'Overzicht totaal', icon: <AnalyticsIcon/>, link: '/overzicht/totaal'},
    {text: 'Overzicht collectief', icon: <AnalyticsIcon/>, link: '/overzicht/collectief'},
    {text: 'Overzicht individueel', icon: <AnalyticsIcon/>, link: '/overzicht/individueel'},
];

const klwItems = [
    {text: 'Importeren', icon: <ImportExportIcon/>, link: '/klw/importeren'},
    {text: 'Importeren MBP/SMA', icon: <ImportExportIcon/>, link: '/klw/importeermbpsma'},
    {text: 'Databeheer', icon: <DatasetIcon/>, link: '/klw/data'},
];

const gisItems = [
    {text: 'Importeren', icon: <ImportExportIcon/>, link: '/gis/importeren'},
    {text: 'Databeheer', icon: <DatasetIcon/>, link: '/gis/data'},
];

const settingItems = [
    {text: 'BBM-codes', icon: <SettingsRoundedIcon/>, link: '/settings/bbmcodes'},
    {text: 'BBM aan KPI\'s', icon: <SettingsRoundedIcon/>, link: '/settings/bbmkpis'},
    {text: 'ScanGIS-pakketten', icon: <SettingsRoundedIcon/>, link: '/settings/scangis'},
    {text: 'ANLb-pakketten', icon: <SettingsRoundedIcon/>, link: '/settings/anlb'},
];

const userItems = [
    {text: 'Gebruikersbeheer', icon: <PersonIcon/>, link: '/users/'},
    {text: 'Rollenbeheer', icon: <BadgeIcon/>, link: '/users/roles'},
];

export default function MenuContent() {

    const {t} = useTranslation();
    return (

        <Stack sx={{flexGrow: 1, p: 4,}}>
            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                Overzichten
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
                Kringloopwijzers
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
                ScanGIS-data
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
                Instellingen
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
                Gebruikers
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
