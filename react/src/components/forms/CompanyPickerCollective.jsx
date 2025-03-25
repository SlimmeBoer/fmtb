import * as React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, {selectClasses} from '@mui/material/Select';
import {styled} from '@mui/material/styles';
import AgricultureIcon from '@mui/icons-material/Agriculture';
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

export default function CompanyPickerCollective(props) {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCompanies();
    }, [])

    const getCompanies = () => {
        setLoading(true);
        axiosClient.get('/companies/currentcollective')
            .then(({data}) => {
                setLoading(false);
                setCompanies(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <Select
            labelId="company-select"
            id="company-simple-select"
            value={props.company || ''}
            onChange={(e) => props.changeHandler(e)}
            inputProps={{'aria-label': 'Select company'}}

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
        >
            {!loading &&  companies.map(c => (
            <MenuItem value={c.id} key={c.id}>
                <ListItemAvatar>
                    <Avatar alt={c.name}>
                        <AgricultureIcon sx={{fontSize: '1rem'}}/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={c.name} secondary={c.address+ ', ' +c.postal_code+', '+c.city}/>
            </MenuItem>))}

        </Select>
    );
}
