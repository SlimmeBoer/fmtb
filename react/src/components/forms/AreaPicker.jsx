import * as React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, {selectClasses} from '@mui/material/Select';
import {styled} from '@mui/material/styles';
import NavigationIcon from '@mui/icons-material/Navigation';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";

const Avatar = styled(MuiAvatar)(({theme}) => ({
    width: 28,
    height: 28,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    color: (theme.vars || theme).palette.text.secondary,
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
    minWidth: 0,
    marginRight: 12,
});

export default function AreaPicker(props) {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAreas();
    }, [])

    const getAreas= () => {
        setLoading(true);
        axiosClient.get('/areas/index')
            .then(({data}) => {
                setLoading(false);
                setAreas(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <Select
            labelId="area-select"
            id="area-simple-select"
            value={props.area || ''}
            onChange={(e) => props.changeHandler(e)}
            inputProps={{'aria-label': 'Select collective'}}

            fullWidth
            sx={{
                maxHeight: 56,
                width: 500,
                '&.MuiList-root': {
                    p: '8px',
                },
                [`& .${selectClasses.select}`]: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    pl: 1,
                },
            }}
        >  {!loading && areas.map(a => (
            <MenuItem value={a.id} key={a.id}>
                <ListItemAvatar>
                    <Avatar alt={a.name}>
                        <NavigationIcon sx={{fontSize: '1rem'}}/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={a.name}/>
            </MenuItem>))}

        </Select>
    );
}
