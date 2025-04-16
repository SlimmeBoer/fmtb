import * as React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, {selectClasses} from '@mui/material/Select';
import {styled} from '@mui/material/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";

export default function RolePicker(props) {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/user/roles')
            .then(({data}) => {
                setRoles(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }, [])

    return (
        <React.Fragment>
            <Select
                labelId="collective-select"
                id="collective-simple-select"
                value={props.role || 0}
                onChange={(e) => props.changeHandler(e)}
                inputProps={{'aria-label': 'Select role'}}
                sx={{
                    maxHeight: 56,
                    width: 518,
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
            >  {!loading && roles.map((r, index) => (
                <MenuItem value={r.id} key={index}>
                    <ListItemText primary={r.name}/>
                </MenuItem>))}
            </Select>
        </React.Fragment>
    );
}
