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
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import DatasetIcon from '@mui/icons-material/Dataset';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import {useTranslation} from "react-i18next";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {showFullName} from "../../helpers/FullName.js";

const mainItems = [
    {text: 'Dashboard', icon: <HomeRoundedIcon/>, link: '/dashboard'},
    {text: 'Overzicht totaal', icon: <AnalyticsIcon/>, link: '/overzicht/totaal'},
    {text: 'Overzicht collectief', icon: <AnalyticsIcon/>, link: '/overzicht/collectief'},
    {text: 'Overzicht individueel', icon: <AnalyticsIcon/>, link: '/overzicht/individueel'},
];

const klwItems = [
    {text: 'Importeren', icon: <ImportExportIcon/>, link: '/klw/importeren'},
    {text: 'Databeheer', icon: <DatasetIcon/>, link: '/klw/data'},
];

const gisItems = [
    {text: 'Importeren', icon: <ImportExportIcon/>, link: '/gis/importeren'},
    {text: 'Databeheer', icon: <DatasetIcon/>, link: '/gis/data'},
];


const settingItems = [
    {text: 'Instellingen', icon: <SettingsRoundedIcon/>, link: '/settings'},
    {text: 'Over', icon: <InfoRoundedIcon/>, link: '/about'},
];

export default function MenuContent() {

    const {t} = useTranslation();
    return (

        <Stack sx={{flexGrow: 1, p: 1, }}>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
               Overzichten
            </Typography>
            <List dense>
                {mainItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton selected={index === 0} component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600, mt: 3 }}>
                Kringloopwijzers
            </Typography>
            <List dense>
                {klwItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton selected={index === 0} component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600, mt: 3  }}>
                ScanGIS-data
             </Typography>
            <List dense>
            {gisItems.map((item, index) => (
                <ListItem key={index} disablePadding sx={{display: 'block'}}>
                    <ListItemButton selected={index === 0} component={Link} to={item.link}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600, mt: 3  }}>
                Overige
            </Typography>
            <List dense>
                {settingItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}
